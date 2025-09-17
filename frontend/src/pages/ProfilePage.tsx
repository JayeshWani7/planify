import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, User, Mail, Phone, Calendar, Edit3, Save, X } from 'lucide-react';
import { useMutation, useQueryClient } from 'react-query';
import { authApi } from '@/api/auth';
import { useAuthStore } from '@/store/authStore';
import { UpdateProfileData, ChangePasswordData } from '@/types/auth.types';
import { formatErrorMessage, formatUserName, getRoleDisplayName } from '@/utils/helpers';
import LoadingSpinner from '@/components/LoadingSpinner';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, updateUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
    setError: setProfileError,
    reset: resetProfile,
  } = useForm<UpdateProfileData>({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      bio: user?.bio || '',
      phone: user?.phone || '',
      dateOfBirth: user?.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    setError: setPasswordError,
    reset: resetPassword,
  } = useForm<ChangePasswordData>();

  const updateProfileMutation = useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (response) => {
      if (response.success && response.data?.user) {
        updateUser(response.data.user);
        setIsEditing(false);
        queryClient.invalidateQueries(['profile']);
      }
    },
    onError: (error: any) => {
      const errorMessage = formatErrorMessage(error);
      setProfileError('root', { message: errorMessage });
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: authApi.changePassword,
    onSuccess: () => {
      setShowChangePassword(false);
      resetPassword();
    },
    onError: (error: any) => {
      const errorMessage = formatErrorMessage(error);
      setPasswordError('root', { message: errorMessage });
    },
  });

  const onSubmitProfile = (data: UpdateProfileData) => {
    updateProfileMutation.mutate(data);
  };

  const onSubmitPassword = (data: ChangePasswordData) => {
    changePasswordMutation.mutate(data);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    resetProfile({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      bio: user?.bio || '',
      phone: user?.phone || '',
      dateOfBirth: user?.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
    });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600 rounded-md"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Profile card */}
          <div className="card p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-800">
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </span>
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {formatUserName(user.firstName, user.lastName)}
                  </h2>
                  <p className="text-gray-600">{getRoleDisplayName(user.role)}</p>
                </div>
              </div>
              
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-secondary flex items-center"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>

            {/* Profile form */}
            <form onSubmit={handleSubmitProfile(onSubmitProfile)}>
              {profileErrors.root && (
                <div className="mb-4 rounded-md bg-red-50 p-4">
                  <div className="text-sm text-red-800">{profileErrors.root.message}</div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      {...registerProfile('firstName', {
                        required: 'First name is required',
                        minLength: { value: 2, message: 'First name must be at least 2 characters' },
                      })}
                      className={`input ${profileErrors.firstName ? 'border-red-300' : ''}`}
                    />
                  ) : (
                    <div className="flex items-center p-2 text-gray-900">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      {user.firstName}
                    </div>
                  )}
                  {profileErrors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{profileErrors.firstName.message}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      {...registerProfile('lastName', {
                        required: 'Last name is required',
                        minLength: { value: 2, message: 'Last name must be at least 2 characters' },
                      })}
                      className={`input ${profileErrors.lastName ? 'border-red-300' : ''}`}
                    />
                  ) : (
                    <div className="flex items-center p-2 text-gray-900">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      {user.lastName}
                    </div>
                  )}
                  {profileErrors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{profileErrors.lastName.message}</p>
                  )}
                </div>

                {/* Email (read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="flex items-center p-2 text-gray-900 bg-gray-50 rounded-md">
                    <Mail className="h-5 w-5 text-gray-400 mr-2" />
                    {user.email}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      {...registerProfile('phone')}
                      type="tel"
                      className="input"
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <div className="flex items-center p-2 text-gray-900">
                      <Phone className="h-5 w-5 text-gray-400 mr-2" />
                      {user.phone || 'Not provided'}
                    </div>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      {...registerProfile('dateOfBirth')}
                      type="date"
                      className="input"
                    />
                  ) : (
                    <div className="flex items-center p-2 text-gray-900">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                      {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not provided'}
                    </div>
                  )}
                </div>

                {/* Bio */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      {...registerProfile('bio')}
                      rows={3}
                      className="input"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <div className="p-2 text-gray-900 min-h-[3rem]">
                      {user.bio || 'No bio provided'}
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              {isEditing && (
                <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="btn-secondary flex items-center"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updateProfileMutation.isLoading}
                    className="btn-primary flex items-center"
                  >
                    {updateProfileMutation.isLoading ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Change password section */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Security</h3>
              {!showChangePassword && (
                <button
                  onClick={() => setShowChangePassword(true)}
                  className="btn-secondary"
                >
                  Change Password
                </button>
              )}
            </div>

            {showChangePassword && (
              <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
                {passwordErrors.root && (
                  <div className="mb-4 rounded-md bg-red-50 p-4">
                    <div className="text-sm text-red-800">{passwordErrors.root.message}</div>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      {...registerPassword('currentPassword', {
                        required: 'Current password is required',
                      })}
                      type="password"
                      className={`input ${passwordErrors.currentPassword ? 'border-red-300' : ''}`}
                      placeholder="Enter current password"
                    />
                    {passwordErrors.currentPassword && (
                      <p className="mt-1 text-sm text-red-600">{passwordErrors.currentPassword.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      {...registerPassword('newPassword', {
                        required: 'New password is required',
                        minLength: { value: 6, message: 'Password must be at least 6 characters' },
                      })}
                      type="password"
                      className={`input ${passwordErrors.newPassword ? 'border-red-300' : ''}`}
                      placeholder="Enter new password"
                    />
                    {passwordErrors.newPassword && (
                      <p className="mt-1 text-sm text-red-600">{passwordErrors.newPassword.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      {...registerPassword('confirmPassword', {
                        required: 'Please confirm your new password',
                      })}
                      type="password"
                      className={`input ${passwordErrors.confirmPassword ? 'border-red-300' : ''}`}
                      placeholder="Confirm new password"
                    />
                    {passwordErrors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{passwordErrors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowChangePassword(false);
                      resetPassword();
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={changePasswordMutation.isLoading}
                    className="btn-primary"
                  >
                    {changePasswordMutation.isLoading ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      'Update Password'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
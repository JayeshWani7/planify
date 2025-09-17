import mongoose, { Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser, IUserMethods, UserRole } from '@/types/user.types';
import { config } from '@/config/env.config';

const userSchema = new Schema<IUser, Model<IUser>, IUserMethods>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please provide a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false // Don't include password in queries by default
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER,
    required: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  profilePicture: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters'],
    default: null
  },
  phone: {
    type: String,
    match: [/^\+?[\d\s-()]{10,}$/, 'Please provide a valid phone number'],
    default: null
  },
  dateOfBirth: {
    type: Date,
    default: null
  },
  
  // Community and Club associations
  communityId: {
    type: Schema.Types.ObjectId,
    ref: 'Community',
    default: null
  },
  clubId: {
    type: Schema.Types.ObjectId,
    ref: 'Club',
    default: null
  },
  
  // Account status
  isActive: {
    type: Boolean,
    default: true
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt
  versionKey: false // Removes __v field
});

// Indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ communityId: 1 });
userSchema.index({ clubId: 1 });
userSchema.index({ createdAt: -1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with salt rounds of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Instance method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

// Instance method to generate JWT token
userSchema.methods.generateAuthToken = function(): string {
  const payload = {
    userId: this._id.toString(),
    email: this.email,
    role: this.role
  };
  
  // @ts-ignore - JWT types are conflicting
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN
  });
};

// Instance method to get public profile (without sensitive data)
userSchema.methods.getPublicProfile = function(): Partial<IUser> {
  const userObject = this.toObject();
  
  // Remove sensitive fields
  const { password, ...publicProfile } = userObject;
  
  return publicProfile;
};

// Static method to find user by email (including password)
userSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email }).select('+password');
};

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure virtual fields are serialized
userSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    // Remove sensitive fields from JSON output
    delete ret.password;
    return ret;
  }
});

export const User = mongoose.model<IUser, Model<IUser> & typeof userSchema.statics>('User', userSchema);
export default User;
import { Router } from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
  logout,
} from '@/controllers/auth.controller';
import {
  authenticate,
  authorize,
} from '@/middleware/auth.middleware';
import {
  registerValidation,
  loginValidation,
  updateProfileValidation,
  changePasswordValidation,
} from '@/middleware/validation.middleware';
import { handleValidationErrors } from '@/middleware/errorHandler.middleware';

const router = Router();

// Public routes
router.post('/register', registerValidation, handleValidationErrors, register);
router.post('/login', loginValidation, handleValidationErrors, login);

// Protected routes (require authentication)
router.use(authenticate); // All routes below this require authentication

router.get('/profile', getProfile);
router.put('/profile', updateProfileValidation, handleValidationErrors, updateProfile);
router.put('/change-password', changePasswordValidation, handleValidationErrors, changePassword);
router.post('/logout', logout);
router.delete('/account', deleteAccount);

export default router;
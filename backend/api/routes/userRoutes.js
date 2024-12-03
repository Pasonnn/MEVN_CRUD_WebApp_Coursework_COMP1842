// ../routes/userRoutes.js

const express = require('express');         // Import Express to set up routing
const router = express.Router();            // Create a new router instance
const userController = require('../controllers/userController'); // Import the user controller
const { authenticateUser, authorizeRoles } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware'); // Import Multer upload middleware

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/profile', authenticateUser, userController.getProfile);

router.put('/profile', authenticateUser, upload.single('avatar'), userController.editProfile);

router.post('/profile/avatar', authenticateUser, upload.single('avatar'), userController.uploadAvatar);

router.delete('/manage_user/:id', authenticateUser, authorizeRoles(['admin']), userController.deleteUser);

router.put('/manage_user/:id', authenticateUser, authorizeRoles(['admin']), userController.updateUserRole);

router.get('/manage_user', authenticateUser, authorizeRoles(['admin']), userController.getAllUsers);

router.get('/manage_user/:id', authenticateUser, authorizeRoles(['admin']), userController.getUserById);

module.exports = router;
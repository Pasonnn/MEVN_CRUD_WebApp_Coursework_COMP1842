const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');
const { authenticateUser, authorizeRoles } = require('../middlewares/authMiddleware');


router.post('/', authenticateUser, recordController.createRecord);

router.get('/', authenticateUser, recordController.getAllRecord);

router.get('/:id', authenticateUser, recordController.getRecordById);

router.put('/:id', authenticateUser, recordController.updateRecordById);

router.delete('/:id', authenticateUser, recordController.deleteRecordById);

router.get('/records/search', authenticateUser, recordController.searchRecords);

module.exports = router;


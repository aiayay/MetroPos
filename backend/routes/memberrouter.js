const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

// Mendapatkan semua member
router.get('/', memberController.getAllMembers);

// Mendapatkan member berdasarkan ID
router.get('/:id', memberController.getMemberById);

// Membuat member baru
router.post('/', memberController.createMember);

// Memperbarui member
router.put('/:id', memberController.updateMember);

// Menghapus member
router.delete('/:id', memberController.deleteMember);

module.exports = router;

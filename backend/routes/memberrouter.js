// routes/memberRoutes.js
const express = require('express');
const router = express.Router();
const memberController = require('../controllers/membercontroller.js');

// Routes CRUD untuk Member
router.get('/', memberController.getAllMember);      // Mendapatkan semua member
router.get('/:id', memberController.getMemberById); // Mendapatkan member berdasarkan ID
router.post('/', memberController.createMember);    // Membuat member baru
router.put('/:id', memberController.updateMember);  // Memperbarui member
router.delete('/:id', memberController.deleteMember); // Menghapus member

module.exports = router;

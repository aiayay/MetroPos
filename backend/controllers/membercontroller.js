const db = require("../models");
const Member = db.member;
const { Op } = require("sequelize");

// Get all members
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.findAll();
    res.status(200).json({
      success: true,
      message: "Daftar member berhasil diambil",
      data: members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data member",
      error: error.message,
    });
  }
};

// Get member by ID
exports.getMemberById = async (req, res) => {
  const { id } = req.params;
  try {
    const member = await Member.findByPk(id);
    if (member) {
      res.status(200).json({
        success: true,
        message: "Member berhasil ditemukan",
        data: member,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Member tidak ditemukan",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data member",
      error: error.message,
    });
  }
};

// Create a new member
exports.createMember = async (req, res) => {
  const { id_member, nmmember, notlp, alamat, jk } = req.body;
  try {
    const newMember = await Member.create({
      id_member: req.body.id_member,
      nmmember: req.body.nmmember,
      notlp: req.body.notlp,
      alamat: req.body.alamat,
      jk: req.body.jk,
    });
    res.status(201).json({
      success: true,
      message: "Member berhasil ditambahkan",
      data: newMember,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menambahkan member",
      error: error.message,
    });
  }
};

// Update member by ID
exports.updateMember = async (req, res) => {
  const { id } = req.params;
  const { nmmember, notlp, alamat, jk } = req.body;
  try {
    const member = await Member.findByPk(id);
    if (member) {
      member.nmmember = nmmember;
      member.notlp = notlp;
      member.alamat = alamat;
      member.jk = jk;
      await member.save();
      res.status(200).json({
        success: true,
        message: "Member berhasil diperbarui",
        data: member,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Member tidak ditemukan",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memperbarui member",
      error: error.message,
    });
  }
};

// Delete member by ID
exports.deleteMember = async (req, res) => {
  const { id } = req.params;
  try {
    const member = await Member.findByPk(id);
    if (member) {
      await member.destroy();
      res.status(200).json({
        success: true,
        message: "Member berhasil dihapus",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Member tidak ditemukan",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menghapus member",
      error: error.message,
    });
  }
};

// Search members by name
exports.searchMembers = async (req, res) => {
  const { query } = req.query;
  try {
    const members = await Member.findAll({
      where: {
        nmmember: {
          [Op.like]: `%${query}%`,
        },
      },
    });
    res.status(200).json({
      success: true,
      message: "Hasil pencarian member",
      data: members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mencari member",
      error: error.message,
    });
  }
};

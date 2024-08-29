// controllers/detailTransaksiController.js
const db = require('../models');
const detail_Transaksi = db.detail_Transaksi;

exports.getAllDetailTransaksi = async (req, res) => {
  try {
    const detailTransaksi = await DetailTransaksi.findAll();
    res.status(200).json(detailTransaksi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDetailTransaksiById = async (req, res) => {
  const id = req.params.id;
  try {
    const detailTransaksi = await DetailTransaksi.findByPk(id);
    if (detailTransaksi) {
      res.status(200).json(detailTransaksi);
    } else {
      res.status(404).json({ message: "Detail Transaksi not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDetailTransaksi = async (req, res) => {
  try {
    const newDetailTransaksi = await DetailTransaksi.create(req.body);
    res.status(201).json(newDetailTransaksi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDetailTransaksi = async (req, res) => {
  const id = req.params.id;
  try {
    const updated = await DetailTransaksi.update(req.body, { where: { id_detailtrans: id } });
    if (updated) {
      res.status(200).json({ message: "Detail Transaksi updated successfully" });
    } else {
      res.status(404).json({ message: "Detail Transaksi not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDetailTransaksi = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await DetailTransaksi.destroy({ where: { id_detailtrans: id } });
    if (deleted) {
      res.status(200).json({ message: "Detail Transaksi deleted successfully" });
    } else {
      res.status(404).json({ message: "Detail Transaksi not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

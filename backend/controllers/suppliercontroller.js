const db = require("../models");
const Supplier = db.Supplier;

// Get all suppliers
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.status(200).json({
      success: true,
      message: "Daftar supplier berhasil diambil",
      data: suppliers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data supplier",
      error: error.message,
    });
  }
};

// Get supplier by ID
exports.getSupplierById = async (req, res) => {
  const { id } = req.params;
  try {
    const supplier = await Supplier.findByPk(id);
    if (supplier) {
      res.status(200).json({
        success: true,
        message: "Supplier berhasil ditemukan",
        data: supplier,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Supplier tidak ditemukan",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data supplier",
      error: error.message,
    });
  }
};

// Create a new supplier
exports.createSupplier = async (req, res) => {
  const { id_supplier, nmsupplier, alamat, notlp } = req.body;
  try {
    const newSupplier = await Supplier.create({
      id_supplier,
      nmsupplier,
      alamat,
      notlp,
    });
    res.status(201).json({
      success: true,
      message: "Supplier berhasil ditambahkan",
      data: newSupplier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menambahkan supplier",
      error: error.message,
    });
  }
};

// Update supplier by ID
exports.updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { nmsupplier, alamat, notlp } = req.body;
  try {
    const supplier = await Supplier.findByPk(id);
    if (supplier) {
      supplier.nmsupplier = nmsupplier;
      supplier.alamat = alamat;
      supplier.notlp = notlp;
      await supplier.save();
      res.status(200).json({
        success: true,
        message: "Supplier berhasil diperbarui",
        data: supplier,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Supplier tidak ditemukan",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memperbarui supplier",
      error: error.message,
    });
  }
};

// Delete supplier by ID
exports.deleteSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    const supplier = await Supplier.findByPk(id);
    if (supplier) {
      await supplier.destroy();
      res.status(200).json({
        success: true,
        message: "Supplier berhasil dihapus",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Supplier tidak ditemukan",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menghapus supplier",
      error: error.message,
    });
  }
};

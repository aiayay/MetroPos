const Supplier = require('../models/supplier');

// Mendapatkan semua supplier
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan supplier berdasarkan ID
exports.getSupplierById = async (req, res) => {
  const { id } = req.params;
  try {
    const supplier = await Supplier.findByPk(id);
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier tidak ditemukan' });
    }
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Membuat supplier baru
exports.createSupplier = async (req, res) => {
  const { nama, alamat } = req.body;
  try {
    const newSupplier = await Supplier.create({ nama, alamat });
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Memperbarui supplier
exports.updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { nama, alamat } = req.body;
  try {
    const supplier = await Supplier.findByPk(id);
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier tidak ditemukan' });
    }
    supplier.nama = nama;
    supplier.alamat = alamat;
    await supplier.save();
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Menghapus supplier
exports.deleteSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    const supplier = await Supplier.findByPk(id);
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier tidak ditemukan' });
    }
    await supplier.destroy();
    res.status(200).json({ message: 'Supplier berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

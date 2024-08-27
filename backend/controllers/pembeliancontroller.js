const Pembelian = require('../config/dbconfig.js');
const { Op } = require('sequelize');

// Mendapatkan semua pembelian
exports.getAllPembelian = async (req, res) => {
    try {
        const pembelian = await Pembelian.findAll();
        res.status(200).json({
            success: true,
            message: 'Daftar semua pembelian',
            data: pembelian
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat mengambil data pembelian',
            error: error.message
        });
    }
};

// Mendapatkan pembelian berdasarkan ID
exports.getPembelianById = async (req, res) => {
    const { id } = req.params;
    try {
        const pembelian = await Pembelian.findByPk(id);
        if (pembelian) {
            res.status(200).json({
                success: true,
                message: 'Detail pembelian',
                data: pembelian
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Pembelian tidak ditemukan'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat mengambil data pembelian',
            error: error.message
        });
    }
};

// Menambahkan pembelian baru
exports.createPembelian = async (req, res) => {
    const { id_pembelian, id_produk, kuantitas, id_supplier, tanggal, harga_beli } = req.body;
    try {
        const newPembelian = await Pembelian.create({
            id_pembelian: req.body.id_pembelian,
            id_produk: req.body.id_produk,
            kuantitas: req.body.kuantitas,
            id_supplier: req.body.id_supplier,
            harga_beli: req.body.harga_beli
        });
        res.status(201).json({
            success: true,
            message: 'Pembelian berhasil ditambahkan',
            data: newPembelian
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat menambahkan pembelian',
            error: error.message
        });
    }
};

// Mengedit pembelian
exports.updatePembelian = async (req, res) => {
    const { id } = req.params;
    const { id_produk, kuantitas, id_supplier, tanggal, harga_beli } = req.body;
    try {
        const pembelian = await Pembelian.findByPk(id);
        if (pembelian) {
            await pembelian.update({
                id_produk,
                kuantitas,
                id_supplier,
                tanggal,
                harga_beli
            });
            res.status(200).json({
                success: true,
                message: 'Pembelian berhasil diperbarui',
                data: pembelian
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Pembelian tidak ditemukan'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat memperbarui pembelian',
            error: error.message
        });
    }
};

// Menghapus pembelian
exports.deletePembelian = async (req, res) => {
    const { id } = req.params;
    try {
        const pembelian = await Pembelian.findByPk(id);
        if (pembelian) {
            await pembelian.destroy();
            res.status(200).json({
                success: true,
                message: 'Pembelian berhasil dihapus'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Pembelian tidak ditemukan'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat menghapus pembelian',
            error: error.message
        });
    }
};

const db = require('../models');
const Kategori = db.Kategori; // Model Kategori
const { Op } = require('sequelize');

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Kategori.findAll();
        res.status(200).json({
            success: true,
            message: 'Daftar kategori berhasil diambil',
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat mengambil data kategori',
            error: error.message
        });
    }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Kategori.findByPk(id);
        if (category) {
            res.status(200).json({
                success: true,
                message: 'Kategori berhasil ditemukan',
                data: category
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Kategori tidak ditemukan'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat mengambil data kategori',
            error: error.message
        });
    }
};

// Create a new category
exports.createCategory = async (req, res) => {
    const { nmkategori } = req.body;
    try {
        const newCategory = await Kategori.create({
            nmkategori
        });
        res.status(201).json({
            success: true,
            message: 'Kategori berhasil ditambahkan',
            data: newCategory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat menambahkan kategori',
            error: error.message
        });
    }
};

// Update category by ID
exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { nmkategori } = req.body;
    try {
        const category = await Kategori.findByPk(id);
        if (category) {
            category.nmkategori = nmkategori;
            await category.save();
            res.status(200).json({
                success: true,
                message: 'Kategori berhasil diperbarui',
                data: category
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Kategori tidak ditemukan'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat memperbarui kategori',
            error: error.message
        });
    }
};

// Delete category by ID
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Kategori.findByPk(id);
        if (category) {
            await category.destroy();
            res.status(200).json({
                success: true,
                message: 'Kategori berhasil dihapus'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Kategori tidak ditemukan'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat menghapus kategori',
            error: error.message
        });
    }
};

// Search categories by name
exports.searchCategories = async (req, res) => {
    const { query } = req.query;
    try {
        const categories = await Kategori.findAll({
            where: {
                nmkategori: {
                    [Op.like]: `%${query}%`
                }
            }
        });
        res.status(200).json({
            success: true,
            message: 'Hasil pencarian kategori',
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat mencari kategori',
            error: error.message
        });
    }
};
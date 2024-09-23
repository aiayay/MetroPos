const { Pembelian, Produk, Supplier } = require('../models');
const moment = require('moment');

// Mendapatkan semua pembelian dengan detail produk dan supplier
exports.getAllPembelian = async (req, res) => {
    try {
        const pembelian = await Pembelian.findAll({
            include: [
                {
                    model: Produk,
                    as: 'produk',
                    attributes: ['id_produk', 'nmproduk', 'stok', 'foto_produk', 'satuan', 'merk', 'harga_jual', 'diskon']
                },
                {
                    model: Supplier,
                    as: 'supplier',
                    attributes: ['id_supplier', 'nmsupplier', 'alamat', 'notlp']
                }
            ]
        });

        // Format tanggal sebelum mengirimkan data
        const formattedPembelian = pembelian.map(item => ({
            ...item.toJSON(),
            tanggal: moment(item.tanggal).format('YYYY-MM-DD'), // Memformat tanggal
        }));

        res.status(200).json({
            success: true,
            message: 'Daftar semua pembelian',
            data: formattedPembelian // Mengirim data yang sudah diformat
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat mengambil data pembelian',
            error: error.message
        });
    }
};

// Mendapatkan pembelian berdasarkan ID dengan detail produk dan supplier
exports.getPembelianById = async (req, res) => {
    const { id } = req.params;
    try {
        const pembelian = await Pembelian.findByPk(id, {
            include: [
                {
                    model: Produk,
                    as: 'produk',
                    attributes: ['id_produk', 'nmproduk', 'stok', 'foto_produk', 'satuan', 'merk', 'harga_jual', 'diskon'] // Mengambil detail produk
                },
                {
                    model: Supplier,
                    as: 'supplier',
                    attributes: ['id_supplier', 'nmsupplier', 'alamat', 'notlp'] // Mengambil detail supplier
                }
            ]
        });
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

// Menambahkan pembelian baru dengan detail produk dan supplier


exports.createPembelian = async (req, res) => {
    const { id_produk, kuantitas, harga_beli, id_supplier, tanggal } = req.body;

    // Format tanggal menjadi YYYY-MM-DD
    const formattedTanggal = moment(tanggal).format('YYYY-MM-DD');

    try {
        // Buat entri pembelian baru
        const pembelian = await Pembelian.create({
            id_produk,
            kuantitas,
            harga_beli,
            id_supplier,
            tanggal: formattedTanggal // Simpan tanggal yang sudah diformat
        });

        // Cari produk yang dibeli berdasarkan id_produk
        const produk = await Produk.findByPk(id_produk);

        if (!produk) {
            return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
        }

        // Update stok produk dengan menambahkan kuantitas baru
        produk.stok += kuantitas;

        // Simpan perubahan pada produk
        await produk.save();

        // Cari supplier berdasarkan id_supplier
        const supplier = await Supplier.findByPk(id_supplier);

        if (!supplier) {
            return res.status(404).json({ success: false, message: 'Supplier tidak ditemukan' });
        }

        // Mengambil data lengkap dari pembelian termasuk detail produk dan supplier
        const result = await Pembelian.findByPk(pembelian.id_pembelian, {
            include: [
                {
                    model: Produk,
                    as: 'produk',
                    attributes: ['id_produk', 'nmproduk', 'stok', 'foto_produk', 'satuan', 'merk', 'harga_jual', 'diskon']
                },
                {
                    model: Supplier,
                    as: 'supplier',
                    attributes: ['id_supplier', 'nmsupplier', 'alamat', 'notlp']
                }
            ]
        });

        // Format tanggal menjadi YYYY-MM-DD untuk respons
        result.tanggal = moment(result.tanggal).format('YYYY-MM-DD');

        res.status(201).json({
            success: true,
            message: 'Pembelian berhasil dan stok produk diperbarui',
            data: result,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Gagal menambahkan pembelian', error: error.message });
    }
};


// Mengedit pembelian dengan detail produk dan supplier
exports.updatePembelian = async (req, res) => {
    const { id } = req.params;
    const { id_produk, kuantitas, id_supplier, tanggal, harga_beli } = req.body;

    try {
        // Ambil pembelian yang ada
        const pembelian = await Pembelian.findByPk(id);
        if (!pembelian) {
            return res.status(404).json({ success: false, message: 'Pembelian tidak ditemukan' });
        }

        // Dapatkan produk terkait
        const produk = await Produk.findByPk(pembelian.id_produk);
        if (!produk) {
            return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
        }

        // Hitung stok baru berdasarkan kuantitas yang baru
        const kuantitasLama = pembelian.kuantitas;

        // Update stok: kurangi stok lama
        produk.stok += kuantitasLama; // Kembalikan stok lama
        produk.stok -= kuantitas; // Kurangi stok dengan kuantitas baru

        // Pastikan stok tidak negatif
        if (produk.stok < 0) {
            return res.status(400).json({ success: false, message: 'Stok tidak cukup' });
        }

        // Simpan perubahan pada produk
        await produk.save();

        // Update data pembelian
        await pembelian.update({
            id_produk,
            kuantitas,
            id_supplier,
            tanggal,
            harga_beli
        });

        // Mengambil data lengkap dari pembelian termasuk detail produk dan supplier
        const updatedPembelian = await Pembelian.findByPk(pembelian.id_pembelian, {
            include: [
                {
                    model: Produk,
                    as: 'produk',
                    attributes: ['id_produk', 'nmproduk', 'stok', 'foto_produk', 'satuan', 'merk', 'harga_jual', 'diskon']
                },
                {
                    model: Supplier,
                    as: 'supplier',
                    attributes: ['id_supplier', 'nmsupplier', 'alamat', 'notlp']
                }
            ]
        });

        res.status(200).json({
            success: true,
            message: 'Pembelian berhasil diperbarui',
            data: updatedPembelian
        });
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

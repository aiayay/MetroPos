 const { DetailTransaksi, Transaksi, Produk } = require('../models');
 const { v4: uuidv4 } = require('uuid');

// // Mendapatkan semua detail transaksi
// exports.getAllDetailTransaksi = async (req, res) => {
//   try {
//     const detailTransaksi = await DetailTransaksi.findAll({
//       include: [
//         { model: Transaksi, as: 'transaksi' }, 
//         { model: Produk, as: 'produk' }
//       ]
//     });
//     res.status(200).json(detailTransaksi);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Mendapatkan detail transaksi berdasarkan ID
// Mendapatkan detail transaksi berdasarkan ID Transaksi
exports.getDetailTransaksiById = async (req, res) => {
  const { id_transaksi } = req.params;
  try {
      const detailTransaksi = await DetailTransaksi.findAll({
          where: { id_transaksi },
          include: [
              { model: Transaksi, as: 'transaksi' }, // Mengambil informasi transaksi
              { model: Produk, as: 'produk' } // Mengambil informasi produk
          ]
      });

      if (detailTransaksi.length === 0) {
          return res.status(404).json({ error: 'Detail transaksi tidak ditemukan' });
      }

      // Mengambil informasi transaksi dari detailTransaksi
      const transaksi = detailTransaksi[0].transaksi; // Mengambil transaksi dari detail pertama

      res.status(200).json({
          transaksi,
          detailTransaksi
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};



// // Membuat detail transaksi baru
// exports.createDetailTransaksi = async (req, res) => {
//   const { id_transaksi, id_produk, nmproduk, harga_produk, kuantitas, catatan } = req.body;

//   try {
//     const transaksi = await Transaksi.findByPk(id_transaksi);
//     const produk = await Produk.findByPk(id_produk);

//     if (!transaksi) {
//       return res.status(404).json({ error: 'Transaksi tidak ditemukan' });
//     }

//     if (!produk) {
//       return res.status(404).json({ error: 'Produk tidak ditemukan' });
//     }

//     if (produk.stok < kuantitas) {
//       return res.status(400).json({ error: 'Stok produk tidak mencukupi' });
//     }

//     const total_harga = harga_produk * kuantitas;

//     const newDetailTransaksi = await DetailTransaksi.create({
//       id_detailtrans: uuidv4(),
//       id_transaksi,
//       id_produk,
//       nmproduk,
//       harga_produk,
//       total_harga,
//       kuantitas,
//       catatan
//     });

//     await Produk.decrement('stok', {
//       by: kuantitas,
//       where: { id_produk }
//     });

//     res.status(201).json(newDetailTransaksi);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Memperbarui detail transaksi
// exports.updateDetailTransaksi = async (req, res) => {
//   const { id } = req.params;
//   const { id_produk, nmproduk, harga_produk, kuantitas, catatan } = req.body;

//   try {
//     const detailTransaksi = await DetailTransaksi.findByPk(id);
//     if (!detailTransaksi) {
//       return res.status(404).json({ error: 'Detail transaksi tidak ditemukan' });
//     }

//     const produk = await Produk.findByPk(id_produk);
//     if (!produk) {
//       return res.status(404).json({ error: 'Produk tidak ditemukan' });
//     }

//     if (produk.stok < kuantitas) {
//       return res.status(400).json({ error: 'Stok produk tidak mencukupi' });
//     }

//     const total_harga = harga_produk * kuantitas;

//     detailTransaksi.id_produk = id_produk;
//     detailTransaksi.nmproduk = nmproduk;
//     detailTransaksi.harga_produk = harga_produk;
//     detailTransaksi.kuantitas = kuantitas;
//     detailTransaksi.catatan = catatan;
//     detailTransaksi.total_harga = total_harga;

//     await detailTransaksi.save();

//     res.status(200).json(detailTransaksi);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Menghapus detail transaksi
// exports.deleteDetailTransaksi = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const detailTransaksi = await DetailTransaksi.findByPk(id);
//     if (!detailTransaksi) {
//       return res.status(404).json({ error: 'Detail transaksi tidak ditemukan' });
//     }

//     await Produk.increment('stok', {
//       by: detailTransaksi.kuantitas,
//       where: { id_produk: detailTransaksi.id_produk }
//     });

//     await detailTransaksi.destroy();
//     res.status(200).json({ message: 'Detail transaksi berhasil dihapus' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

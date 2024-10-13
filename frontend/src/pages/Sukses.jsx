import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../features/constants';
import jsPDF from 'jspdf'; 
import 'jspdf-autotable'; 
import "../index.css";

export default class Sukses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keranjang: [], // Inisialisasi keranjang di state
            paymentMethod: '', // Inisialisasi metode pembayaran
        };
    }

    async componentDidMount() {
        try {
            const res = await axios.get(API_URL + "keranjang");
            console.log("Response : ", res);

            // memastikan bos res.data adalah array
            const keranjang = res.data;

            if (Array.isArray(keranjang)) {
                this.setState({ keranjang }); // Simpan keranjang ke state

                const deletePromises = keranjang.map(item => {
                    console.log("Deleting item with id_keranjang:", item.id_keranjang);
                    return axios.delete(API_URL + "keranjang/" + item.id_keranjang)
                        .then(res => console.log(res))
                        .catch(error => console.log(error));
                });

                // Tunggu semua permintaan DELETE selesai
                await Promise.all(deletePromises);
                console.log("Semua item telah dihapus.");
            } else {
                console.error("Data keranjang tidak dalam format array:", keranjang);
            }

        } catch (error) {
            console.log(error);
        }
    }

    handlePrintReceipt = () => {
        const { keranjang } = this.state;

        const doc = new jsPDF();
        doc.text("Struk Pembelian", 14, 16);

        // Siapkan data untuk tabel
        const tableData = keranjang.map(item => [
            item.produk.nmproduk,
            item.kuantitas,
            item.total_harga,
            item.catatan,
        ]);

        // Tambahkan tabel ke PDF
        doc.autoTable({
            head: [['Nama Produk', 'Kuantitas', 'Total Harga','catatan']],
            body: tableData,
            startY: 30,
        });

        doc.save("struk_pembelian.pdf");
    };

    render() {
        return (
            <div className="is-flex is-justify-content-center is-align-items-center mt-4 has-background-white" style={{ height: '100vh', flexDirection: 'column' }}>
                <img src="assets/images/foto.png" width="500" alt="Foto" />
                <h2 className="mt-4 text-black">Sukses Pesan</h2>
                <p className='text-black'>Terima Kasih Sudah Memesan</p>
                {/* Tombol untuk mencetak struk */}
                <button onClick={this.handlePrintReceipt} className="button is-primary mt-4">
                    Cetak Struk
                </button>
                <Link to="/kasir" className="button is-secondary mt-4">
                    Kembali
                </Link>
            </div>
        );
    }
}

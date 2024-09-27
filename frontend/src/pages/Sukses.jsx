import React, { Component } from 'react';
import KasirLayout from "./KasirLayout";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../features/constants';

export default class Sukses extends Component {

    async componentDidMount() {
        try {
            const res = await axios.get(API_URL + "keranjang");
            console.log("Response : ", res);

            // Pastikan res.data adalah array
            const keranjang = res.data;

            if (Array.isArray(keranjang)) {
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

    render() {
      return (
          <div className="is-flex is-justify-content-center is-align-items-center mt-4 has-background-white" style={{ height: '100vh', flexDirection: 'column' }}>
              <img src="assets/images/foto.png" width="500" alt="Foto" />
              <h2 className="mt-4 text-black">Sukses Pesan</h2>
              <p className='text-black'>Terima Kasih Sudah Memesan</p>
              {/* Ganti button menjadi Link */}
              <Link to="/kasir" className="button is-primary mt-4">
                  Kembali
              </Link>
          </div>
      )
  }
  
}

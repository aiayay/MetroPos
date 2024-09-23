import React, { Component } from 'react'
import KasirLayout from "./KasirLayout";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../features/constants';
export default class Sukses extends Component {

    componentDidMount () {
        axios
      .get(API_URL + "keranjang")
      .then((res) => {
        // console.log("Response : ", res);
        const keranjang = res.data;
       keranjang.map(function(item){
        return axios.delete(API_URL+"keranjang/"+item.id_keranjang)
        .then((res) => console.log(res))
        .catch((error) => console.log(error))
       })
      })
      .catch((error) => {
        console.log(error);
      });
    }
  render() {
    return (
      <div className='mt-4 text-center'>
        <img src="assets/images/foto.png" width="500" alt="" />
        <h2>Sukses Pesan</h2>
        <p>Terima Kasih Sudah Memesan</p>
        <button as={Link} to="/kasir" variant="primary">Kembali</button>
      </div>
    )
  }
}

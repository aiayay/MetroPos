import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { numberWithCommas } from "../features/utils";
import { IoAddCircle, IoRemoveCircleOutline } from "react-icons/io5";
import { FaTrashAlt } from 'react-icons/fa'; // Ikon hapus

const ModalKeranjang = ({ showModal, handleClose, keranjangDetail, kuantitas, catatan, tambah, kurang, changeHandler, handleSubmit, totalHarga, hapusPesanan }) => {
  if (keranjangDetail) {
    return (
      <Modal show={showModal} onHide={handleClose} className="bootstrap-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            {keranjangDetail.produk?.nmproduk} <strong className="text-black">(Rp. {keranjangDetail.produk?.harga_jual ? numberWithCommas(keranjangDetail.produk.harga_jual) : "N/A"})</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mt-4" controlId="exampleForm.ControlInput1">
              <Form.Label>Total Harga :</Form.Label>
              <p>
                <strong className="text-black">Rp. {totalHarga ? numberWithCommas(totalHarga) : "N/A"}</strong>
              </p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Jumlah :</Form.Label>
              <div className="d-flex align-items-center">
                <Button variant="primary" size="sm" className="mr-2" onClick={() => kurang()}>
                  <IoRemoveCircleOutline size={24} /> {/* Ukuran ikon ditambah */}
                </Button>

                <strong className="mx-3 text-black">{kuantitas}</strong>

                <Button variant="primary" size="sm" className="ml-2" onClick={() => tambah()}>
                  <IoAddCircle size={24} /> {/* Ukuran ikon ditambah */}
                </Button>
              </div>
            </Form.Group>

            <Form.Label>Keterangan :</Form.Label>
            <Form.Group className="mb-3 mt-4" controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                rows="3"
                name="keterangan"
                placeholder="Contoh : Pedes, Nasi Setengah"
                value={catatan}
                onChange={(event) => changeHandler(event)}
              />
            </Form.Group>
            <button type="submit" className="button is-success">
              Simpan
            </button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between mt-4">
          <button variant="danger" onClick={() => hapusPesanan(keranjangDetail.id_keranjang)} className="button is-danger d-flex align-items-center">
            <FaTrashAlt className="mr-2" /> Hapus Pesanan
          </button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={showModal} onHide={handleClose} className="bootstrap-modal">
        <Modal.Header closeButton>
          <Modal.Title>Kosong</Modal.Title>
        </Modal.Header>
        <Modal.Body>Kosong</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default ModalKeranjang;

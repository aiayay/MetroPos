import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { numberWithCommas } from "../features/utils";
import { IoAddCircle, IoRemoveCircleOutline } from "react-icons/io5";

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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Total Harga :</Form.Label>
              <p>
                <strong>(Rp. {totalHarga ? numberWithCommas(totalHarga) : "N/A"})</strong>
              </p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Jumlah :</Form.Label>
              <br />

              <Button variant="primary" size="sm" className="mr-2" onClick={() => kurang()}>
                <IoRemoveCircleOutline />
              </Button>

              <strong>{kuantitas}</strong>

              <Button variant="primary" size="sm" className="ml-2" onClick={() => tambah()}>
                <IoAddCircle />
              </Button>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Keterangan :</Form.Label>
              <Form.Control as="textarea" rows="3" name="keterangan" placeholder="Contoh : Pedes, Nasi Setengah" value={catatan} onChange={(event) => changeHandler(event)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Simpan
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => hapusPesanan(keranjangDetail.id_keranjang)}>
            Hapus Pesanan
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    // const modalClass = showModal ? "modal is-active" : "modal";
    return (
      <Modal show={showModal} onHide={handleClose}>
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

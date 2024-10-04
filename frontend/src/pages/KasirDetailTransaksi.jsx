import React,{useEffect} from "react";
import KasirLayout from "./KasirLayout";
import KasirTransaksiDetail from "../components/KasirTransaksiDetail";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
const KasirTransaksi = () => {
    return (
      <KasirLayout>
        <KasirTransaksiDetail />
      </KasirLayout>
    );
  };
  
  export default KasirTransaksi;

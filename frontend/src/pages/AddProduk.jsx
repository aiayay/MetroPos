import React,{useEffect} from "react";
import Layout from "./Layout";
import FormAddProduk from "../components/FormAddProduk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
const AddProduk = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isError, user} = useSelector((state => state.auth));

  useEffect (()=>{
    dispatch(getMe());
  }, [dispatch]);

  useEffect (()=>{
    if(isError){
     navigate("/");
    }
    if (user && user.level !== "admin"){
     navigate("/")
    }
   },[isError, user, navigate]);
  return (
    <Layout>
      <FormAddProduk />
    </Layout>
  );
};

export default AddProduk;

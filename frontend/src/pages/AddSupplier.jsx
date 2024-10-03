import React,{useEffect} from "react";
import Layout from "./Layout";
import FormAddSupplier from "../components/FormAddSupplier";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
const AddSupplier = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isError,user} = useSelector((state => state.auth));

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
      <FormAddSupplier />
    </Layout>
  );
};

export default AddSupplier;

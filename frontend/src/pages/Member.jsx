import React,{useEffect} from "react";
import Layout from "./Layout";
import MemberList from "../components/MemberList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
const Member = () => {
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
      <MemberList />
    </Layout>
  );
};

export default Member;

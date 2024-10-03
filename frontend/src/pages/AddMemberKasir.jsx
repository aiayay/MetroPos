import React,{useEffect} from "react";
import KasirLayout from "./KasirLayout";
import KasirAddMember from "../components/KasirAddMember";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
const AddMemberKasir = () => {
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
    <KasirLayout>
      <KasirAddMember />
    </KasirLayout>
  );
};

export default AddMemberKasir;

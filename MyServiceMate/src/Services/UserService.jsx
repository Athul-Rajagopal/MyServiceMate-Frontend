import React from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/AuthSlice";
import AxiosInstance from "../axios/axiosInstance";

// export const createMessage = async(formData)=>{
//     try{
//       const userData = useSelector(selectUserData)
//       const {accessToken} = userData
//       const axiosInstance = AxiosInstance(accessToken)
//       const response = await axiosInstance.post(`/create/`,formData,{
//         // headers
//       })
//       return response.data
//     }catch(error){
//       console.error('error creating message:',error)
//       return null
//     }
//   }

  export const createMessage = async (formData, accessToken) => {
    try {
      const axiosInstance = AxiosInstance(accessToken);
      const response = await axiosInstance.post(`/create/`, formData, {
        // headers
      });
      return response.data;
    } catch (error) {
      console.error('Error creating message:', error);
      return null;
    }
  }


  export const fetch_user_messages = async(userId,workerId,accessToken)=>{
    try{
        const axiosInstance = AxiosInstance(accessToken)
      const response = await axiosInstance.get(`/chat/${userId}/${workerId}/`,
      // {headers}
      );
      return response.data
  }catch(error){
    console.error("error for fetchig messages:",error)
    return null
  }
  }
import axiosInstance from "../services/axiosInstance";

export const getAllPaymentHistory = async () => {
    try {
      const response = await axiosInstance.get('/getAllHistory'); 
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  export const getAllStudents = async () => {
    try {
      const response = await axiosInstance.get('/getAllStudent'); 
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  export const getAllPayment= async () => {
    try {
      const response = await axiosInstance.get('/getAllPayment'); 
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }; 

export const totalamountPayment = async ()=>{
   try{
    const response = await axiosInstance.get("/totalAmount")
    return response.data;
   }catch(error){
    console.error('Error fetching data:', error);
    throw error;
   }
}


 export const totalPaymentDue = async ()=>{
   try{
    const response = await axiosInstance.get("/totalPaymentDue")
    return response.data;
   }catch(error){
    console.error('Error fetching data:', error);
    throw error;
   }
}

export const getTotalStudent = async ()=>{
  try{
   const response = await axiosInstance.get("/getTotalStudent")
   return response.data;
  }catch(error){
   console.error('Error fetching data:', error);
   throw error;
  }
}

export const getSingleUserDetails= async (id) => {
  try {
    const response = await axiosInstance.get('/userHistory/'+id); 
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const allPaymentStudentId = async (studentId)=>{
  try{
   const response = await axiosInstance.get(`/allPaymentStudentId/${studentId}`);
   return response.data;
  }catch(error){
    console.error('Error fetching data:', error);
    throw error;
  }
}



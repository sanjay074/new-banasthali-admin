import "./account.module.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useParams,useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from "../config.js/baseUrl";
const Account = ({ title }) => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    rollNumber: "",
    amount: "",
    phoneNumber: "",
    transactionId: "",
    paymentType: "",  // This will be updated with the selected radio button
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioChange = (e) => {
    setFormData({
      ...formData,
      paymentType: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.post(baseUrl+"/payment", {
        studentId: formData.studentId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        rollNumber: formData.rollNumber,
        phoneNumber: formData.phoneNumber,
        amount: formData.amount,
        transactionId: formData.transactionId,
        paymentType: formData.paymentType,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Student payment successfully", { autoClose: 600 });
      setTimeout(() => {
        navigate("/accountList");
    }, 1000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add Transaction Data</h1>
        </div>
        <div className="bottom">
          <div className="left">
            {/* You can render the image preview here if needed */}
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label>Student ID</label>
                <input
                  type="text"
                  name="studentId"
                  placeholder="Enter student ID"
                  value={formData.studentId}
                  onChange={handleInputChange}
                />
              </div>
            
              <div className="formInput">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Roll Number</label>
                <input
                  type="text"
                  name="rollNumber"
                  placeholder="Enter roll number"
                  value={formData.rollNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Transaction ID</label>
                <input
                  type="text"
                  name="transactionId"
                  placeholder="Enter transaction ID"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Payment Type</label>
                <div>
                  <input
                    type="radio"
                    id="cash"
                    name="paymentType"
                    value="cash"
                    checked={formData.paymentType === "cash"}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="cash">Cash</label>

                  <input
                    type="radio"
                    id="online"
                    name="paymentType"
                    value="online"
                    checked={formData.paymentType === "online"}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="online">Online</label>
                </div>
              </div>

              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Account;

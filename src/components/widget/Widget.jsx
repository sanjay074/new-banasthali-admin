import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useState, useEffect } from "react";
import { getTotalStudent, totalPaymentDue,totalamountPayment } from "../../pages/services/apiServices";

const Widget = ({ type }) => {
  const [totalStudent, setTotalStudent] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalAmount,setTotalAmount]= useState(0);
  //get total payment 
  useEffect(() => {
    const fetchTotalPayment = async () => {
      try {
        const result = await totalamountPayment();
        setTotalAmount(result.totalAmount);
      } catch (error) {
        console.error('Error fetching total payment due:', error);
      }
    };

    fetchTotalPayment();
  }, []);
  //get total payment amount
  useEffect(() => {
    const fetchTotalPayment = async () => {
      try {
        const result = await totalPaymentDue();
        setTotalPayment(result.totalPaymentDue);
      } catch (error) {
        console.error('Error fetching total payment due:', error);
      }
    };

    fetchTotalPayment();
  }, []);
// get total Student 
  useEffect(() => {
    const fetchTotalStudent = async () => {
      try {
        const result = await getTotalStudent();
        setTotalStudent(result.total);
      } catch (error) {
        console.error('Error fetching total students:', error);
      }
    };

    fetchTotalStudent();
  }, []);

  let data;

  switch (type) {
    case "user":
      data = {
        amount: totalStudent,
        title: "Students",
        isMoney: false,
        // link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        amount:10,
        title: "Events",
        isMoney: false,
        // link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        amount:totalAmount,
        title: "EARNINGS",
        isMoney: true,
        // link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        amount: totalPayment,
        title: "Student Due",
        isMoney: true,
        // link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney ? "₹" : ""} {data.amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;

import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import { getSingleUserDetails } from "../services/apiServices";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {allPaymentStudentId} from "../../pages/services/apiServices" ;
const Single = () => {
  const [singleUser, setSingleUser] = useState({});
  const { userId } = useParams();

  const fetchData = async (id) => {
    try {
      const result = await getSingleUserDetails(id);
      setSingleUser(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(userId);
  }, [userId]);

  const [paymentHistory ,setPaymentHistory ] = useState([]);
  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const result = await allPaymentStudentId(id);
        setPaymentHistory(result.payments);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(userId);
  }, [userId]);

  
//Get student payment  history 
  const rows = [
    {
      id: 1143155,
      product: "Acer Nitro 5",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "Playstation 5",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Michael Doe",
      date: "1 March",
      amount: 900,
      method: "Online Payment",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "Redragon S101",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 35,
      method: "Cash on Delivery",
      status: "Pending",
    },
    {
      id: 2357741,
      product: "Razer Blade 15",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Jane Smith",
      date: "1 March",
      amount: 920,
      method: "Online",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "ASUS ROG Strix",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Harold Carol",
      date: "1 March",
      amount: 2000,
      method: "Online",
      status: "Pending",
    },
  ];

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={singleUser?.userHistory?.urlImgae || "https://via.placeholder.com/150"}
                alt="User"
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{`${singleUser?.userHistory?.studentDetails?.firstName} ${singleUser?.userHistory?.studentDetails?.lastName}`}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{singleUser?.userHistory?.studentDetails?.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{singleUser?.userHistory?.studentDetails?.mobileNumber}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{singleUser?.userHistory?.studentDetails?.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">RollNumber:</span>
                  <span className="itemValue">{singleUser?.userHistory?.studentDetails?.rollNumber}</span>
                </div>
              </div>
            </div>
          </div>
          {/* card */}
          <div className="right">
          <div className="container">
         <div>
        <span className="label">Payment Received</span>
        <div className="text-received">₹ {singleUser.receivedAmount}</div>
       </div>
      <div>
        <span className="label">Payment Due</span>
        <div className="text-due">₹ {singleUser?.userHistory?.paymentDue}</div>
      </div>
      </div>
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <TableContainer component={Paper} className="table">
       <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Student Name</TableCell>
            <TableCell className="tableCell">TransactionId</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">TransactionDate</TableCell>
            <TableCell className="tableCell">RollNumber</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
         </TableHead>
         <TableBody>
          {paymentHistory.map((row) => (
    
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.firstName}</TableCell>
              {/* <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell> */}
              <TableCell className="tableCell">{row.transactionId}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.createdAt}</TableCell>
              <TableCell className="tableCell">{row.rollNumber}</TableCell>
              <TableCell className="tableCell">{row.paymentType}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          {/* <List /> */}
        </div>
      </div>
    </div>
  );
};

export default Single;

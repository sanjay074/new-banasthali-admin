import "./accountList.module.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllPayment, totalamountPayment } from "../../pages/services/apiServices";
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from "../../components/navbar/Navbar";
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';

const AccountList = () => {
  const userColumns = [
    {
      field: "firstName",
      headerName: "First Name",
      width: 230,
      renderCell: (params) => (
        <div className="cellWithImg">
          {params.row.firstName}
        </div>
      ),
    },
    {
      field: "rollNumber",
      headerName: "Roll Number",
      width: 230,
      renderCell: (params) => (
        <div className="cellWithImg">
          {params.row.rollNumber}
        </div>
      ),
    },
    {
      field: "studentId",
      headerName: "Student Id",
      width: 230,
      renderCell: (params) => (
        <div className="cellWithImg">
          {params.row.studentId.studentDetails.studentId}
        </div>
      ),
    },
    {
      field: "courseName",
      headerName: "Course name",
      width: 230,
      renderCell: (params) => (
        <div className="cellWithImg">
          {params.row.studentId.courseDetails.courseName}
        </div>
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 100,
      renderCell: (params) => (
        <div className="cellWithImg">
          {params.row.amount}
        </div>
      ),
    },
    {
      field: "transactionId",
      headerName: "Transaction Id",
      width: 100,
      renderCell: (params) => (
        <div className="cellWithImg">
          {params.row.transactionId}
        </div>
      ),
    },
    {
      field: "createdAt",
      headerName: "Date",
      width: 100,
      renderCell: (params) => (
        <div className="cellWithImg">
          {params.row.createdAt}
        </div>
      ),
    },
    {
      field: "phoneNumber",
      headerName: "Number",
      width: 100,
      renderCell: (params) => (
        <div className="cellWithImg">
          {params.row.phoneNumber}
        </div>
      ),
    },
    {
      field: "paymentType",
      headerName: "Payment Type",
      width: 100,
      renderCell: (params) => (
        <div className="cellWithImg">
          {params.row.paymentType}
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      ),
    },
  ];

  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllPayment();
        const formattedData = result.getAllPayment.map(payment => ({
          ...payment,
          createdAt: format(new Date(payment.createdAt), 'dd-MM-yyyy')
        }));
        setPaymentHistory(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const downloadCSV = () => {
    const csvData = paymentHistory.map((row) => ({
      FirstName: row.firstName,
      RollNumber: row.rollNumber,
      StudentId: row.studentId.studentDetails.studentId,
      CourseName: row.studentId.courseDetails.courseName,
      Amount: row.amount,
      TransactionId: row.transactionId,
      Date: row.createdAt,
      Number: row.phoneNumber,
      PaymentType: row.paymentType,
      Status: row.status,
    }));
    const csvOptions = {
      headers: true,
      filename: 'payment_history.csv',
    };
    return <CSVLink data={csvData} {...csvOptions}>Download CSV</CSVLink>;
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        ['First Name', 'Roll Number', 'Student ID', 'Course Name', 'Amount', 'Transaction ID', 'Date', 'Number', 'Payment Type', 'Status']
      ],
      body: paymentHistory.map((row) => [
        row.firstName,
        row.rollNumber,
        row.studentId.studentDetails.studentId,
        row.studentId.courseDetails.courseName,
        row.amount,
        row.transactionId,
        row.createdAt,
        row.phoneNumber,
        row.paymentType,
        row.status
      ]),
    });
    doc.save('payment_history.pdf');
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top"></div>
        <div className="datatable">
          <div className="datatableTitle">
            Get all payment list
            <button onClick={downloadPDF}>Download PDF</button>
          </div>
          <DataGrid
            className="datagrid"
            rows={paymentHistory}
            columns={userColumns}
            pageSize={9}
            rowsPerPageOptions={[10]}
            checkboxSelection
            getRowId={(row) => row._id}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountList;
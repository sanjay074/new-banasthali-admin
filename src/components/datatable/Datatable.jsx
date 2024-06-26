import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllStudents } from "../../pages/services/apiServices";
import { Button } from "@mui/material";
import { jsPDF } from 'jspdf';
import { CSVLink } from "react-csv";
import 'jspdf-autotable';
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom"; 

const Datatable = () => {
  let navigate = useNavigate();
  const userColumns = [
    {
      field: "firstName",
      headerName: "First Name",
      width: 230,
      renderCell: (params) => (
        <div className="cellWithImg">
          {params.row.studentDetails.firstName}
        </div>
      ),
    },
    {
      field: "studentId",
      headerName: "Student ID",
      width: 230,
      renderCell: (params) => (
        <div className="cellWithImg">
          {params.row.studentDetails.studentId}
        </div>
      ),
    },
    {
      field: "paymentDue",
      headerName: "Payment Due",
      width: 100,
      renderCell: (params) => (
        <div className="cellWithImg">
          {params.row.paymentDue}
        </div>
      ),
    },
    {
      field: "admissionFees",
      headerName: "Admission Fees",
      width: 100,
      renderCell: (params) => (
        <div className="cellWithImg">
          {params.row.admissionFees}
        </div>
      ),
    },
    {
      field: "rollNumber",
      headerName: "Roll Number",
      width: 100,
      renderCell: (params) => (
        <div className="cellWithImg">
          {params.row.studentDetails.rollNumber}
        </div>
      ),
    },
    {
      field: "courseName",
      headerName: "Course Name",
      width: 100,
      renderCell: (params) => (
        <div className="cellWithImg">
          {params.row.courseDetails.courseName}
        </div>
      ),
    },
    {
      field: "mobileNumber",
      headerName: "Mobile Number",
      width: 100,
      renderCell: (params) => (
        <div className="cellWithImg">
          {params.row.studentDetails.mobileNumber}
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
  ];

  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const result = await getAllStudents();
        const formattedData = result.getAllStudent.map(data=>({
          ...data,
          createdAt: format(new Date(data.createdAt), 'dd-MM-yyyy')
        }))
        setStudentList(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStudents();
  }, []);
  const editData = (id) => {
    navigate(`/updateStudent/${id}`)
} 
  const handleDelete = (id) => {
    console.log("Deleting student with ID:", id);
    // Implement delete logic here
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <Link to={`/users/${params.row.id}`} style={{ textDecoration: "none" }}>
            <div className="viewButton">View</div>
          </Link>
           <div className="deleteButton" onClick={() =>editData(params.row.id)}>
            Edit
          </div> 
        </div>
      ),
    },
  ];

  const downloadCSV = () => {
    const csvData = studentList.map((row) => ({
      "First Name": row.studentDetails.firstName,
      "Student ID": row.studentDetails.studentId,
      "Payment Due": row.paymentDue,
      "Admission Fees": row.admissionFees,
      "Roll Number": row.studentDetails.rollNumber,
      "Course Name": row.courseDetails.courseName,
      "Mobile Number": row.studentDetails.mobileNumber,
      "Date": row.createdAt,
    }));
    const csvOptions = {
      headers: true,
      filename: 'student_list.csv',
    };
    return <CSVLink data={csvData} {...csvOptions}>Download CSV</CSVLink>;
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        ['First Name', 'Student ID', 'Payment Due', 'Admission Fees', 'Roll Number', 'Course Name', 'Mobile Number', 'Date']
      ],
      body: studentList.map((row) => [
        row.studentDetails.firstName,
        row.studentDetails.studentId,
        row.paymentDue,
        row.admissionFees,
        row.studentDetails.rollNumber,
        row.courseDetails.courseName,
        row.studentDetails.mobileNumber,
        row.createdAt,
      ]),
    });
    doc.save('student_list.pdf');
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Student
       
        <div className="actionButtons">
        <Link to="/users/new" className="link">
          Add New Student
        </Link>   
    {/* <Button variant="contained" onClick={downloadCSV}>Download CSV</Button> */}
    <Button variant="contained" onClick={downloadPDF}>Download PDF</Button>
  </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={studentList}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;

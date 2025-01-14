export const userColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "firstName",
    headerName: "firstName",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {/* <img className="cellImg" src={params.row.img} alt="avatar" /> */}
          {params.row.firstName}
        </div>
      );
    },
  },
  {
    field: "studentId",
    headerName: "StudentId",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row?.studentId?.studentDetails?.studentId}
        </div>
      );
    },
  },

  {
    field: "paymentDue",
    headerName: "PaymentDue",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row?.studentId?.paymentDue}
        </div>
      );
    },
  },
  {
    field: "admissionFees",
    headerName: "AdmissionFees",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row?.studentId?.admissionFees}
        </div>
      );
    },
  },
  {
    field: "rollNumber",
    headerName: "rollNumber",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row?.rollNumber}
        </div>
      );
    },
  },
  {
    field: "transactionId",
    headerName: "TransactionId",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row?.transactionId}
        </div>
      );
    },
  },
  {
    field: "mobileNumber",
    headerName: "MobileNumber",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row?.studentId?.studentDetails?.mobileNumber}
        </div>
      );
    },
  },
  {
    field: "paymentType",
    headerName: "PaymentType",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row?.paymentType}
        </div>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        // <div className={`cellWithStatus ${params.row.status}`}>
          {/* {params.row.status} */}
        //</div>
      );
    },
  },
];

//temporary data
export const userRows = [
  {
    id: 1,
    username: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    username: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];

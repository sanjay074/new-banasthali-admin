import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams,useNavigate } from "react-router-dom";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { getSingleUserDetails } from "../services/apiServices";
import { baseUrl } from "../config.js/baseUrl";
const Editstudent = ({ title }) => {
    const { id } = useParams();  
    let navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [userData, setUserData] = useState({});
    const [formData, setFormData] = useState({
        studentDetails: {},
        parentDetails: {},
        courseDetails: {},
        admissionFees: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [section, key] = name.split('.');

        if (key) {
            setFormData((prevData) => ({
                ...prevData,
                [section]: {
                    ...prevData[section],
                    [key]: value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [section]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        if (file) {
            data.append('image', file);
        }

        Object.keys(formData).forEach((section) => {
            if (typeof formData[section] === 'object') {
                Object.keys(formData[section]).forEach((key) => {
                    data.append(`${section}[${key}]`, formData[section][key]);
                });
            } else {
                data.append(section, formData[section]);
            }
        });

        try {
            const response = await axios.put(`${baseUrl}/updateStudent/${id}`, data);
            toast.success('Student updated successfully!', { autoClose: 600 });
            setTimeout(() => {
                navigate("/users");
            }, 1000); 
           
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getSingleUserDetails(id);
                setUserData(result.userHistory);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);
//add 
    useEffect(() => {
        if (userData) {
            setFormData({
                studentDetails: userData.studentDetails || {},
                parentDetails: userData.parentDetails || {},
                courseDetails: userData.courseDetails || {},
                admissionFees: userData.admissionFees || '',
            });
        }
    }, [userData]);

    const inputs = [
        {
            section: "studentDetails",
            label: "First Name",
            name: "firstName",
            type: "text",
            placeholder: "raj",
        },
        {
            section: "studentDetails",
            label: "Last Name",
            name: "lastName",
            type: "text",
            placeholder: "kuamr",
        },
        {
            section: "studentDetails",
            label: "Gender",
            name: "gender",
            type: "text",
            placeholder: "Male/Female",
        },
        {
            section: "studentDetails",
            label: "Date of Birth",
            name: "dob",
            type: "date",
        },
        {
            section: "studentDetails",
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "example@example.com",
        },
        {
            section: "studentDetails",
            label: "studentId",
            name: "studentId",
            type: "text",
        },
        {
            section: "studentDetails",
            label: "RollNumber",
            name: "rollNumber",
            type: "text",
            placeholder: "162728828",
        },
        {
            section: "studentDetails",
            label: "Mobile Number",
            name: "mobileNumber",
            type: "text",
            placeholder: "1234567890",
        },
        {
            section: "studentDetails",
            label: "Address",
            name: "address",
            type: "text",
            placeholder: "123 Main St",
        },
        {
            section: "parentDetails",
            label: "Parent First Name",
            name: "firstName",
            type: "text",
            placeholder: "Jane",
        },
        {
            section: "parentDetails",
            label: "Parent Last Name",
            name: "lastName",
            type: "text",
            placeholder: "Doe",
        },
        {
            section: "parentDetails",
            label: "Parent Mobile Number",
            name: "mobileNumber",
            type: "text",
            placeholder: "1234567890",
        },
        {
            section: "courseDetails",
            label: "Course Name",
            name: "courseName",
            type: "text",
            placeholder: "B.Tech",
        },
        {
            section: "courseDetails",
            label: "Session",
            name: "session",
            type: "text",
            placeholder: "2023-2024",
        },
        {
            label: "Admission Fees",
            name: "admissionFees",
            type: "number",
            placeholder: "20000",
        },
    ];

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form onSubmit={handleSubmit}>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </div>

                            {inputs.map((input, index) => (
                                <div className="formInput" key={index}>
                                    <label>{input.label}</label>
                                    <input
                                        type={input.type}
                                        name={input.section ? `${input.section}.${input.name}` : input.name}
                                        placeholder={input.placeholder}
                                        value={input.section ? formData[input.section][input.name] || '' : formData[input.name] || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                            
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Editstudent;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./StudentList.css";


const StudentList = () => {
  const navigate = useNavigate();
  
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5215/api/students");
        setStudents(response.data); // Set the fetched students
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchEvents();
  }, []);



  const backTodash = () => {
    navigate("/admin-dashboard"); // Navigate to the dashboard
  };

  return (
    <div className="studentlist- page">
          <div className="student-list-container">
      <h1 className="title">Student List</h1>
      <table className="student-table">
        <thead>
          <tr>
         
            <th>select Event</th>
            <th>Username</th>
           
            <th>Email</th>
            
          </tr>
        </thead>
        <tbody>
        {students.map((student) => (
                <tr key={student.username}
                onClick={() => setSelectedStudent(student)} // Set selected student
                className={
                  selectedStudent && selectedStudent.username === student.username
                    ? "selected-row"
                    : ""
                }>
                   <td>
                    <input
                      type="radio"
                      name="selectedStudent"
                      checked={selectedStudent && selectedStudent.username === student.username}
                      readOnly
                    />
                  </td>
       
                 
                 <td>{student.username}</td>
                 {/*<td>{student.password}</td>*/}
                 <td>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>





    </div>
    <footer className="StudentList-footer">
      <button onClick={backTodash} className="back-button">
        Back to Dashboard
      </button>

      </footer>

    </div>

    
  );
};

export default StudentList;



import React, { useEffect, useState } from "react";
import { Table, Card } from "react-bootstrap";
import axiosApi from "../../../components/AxiosApi";

const StudentClasses = ({ studentId }) => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axiosApi.get(`http://localhost:8080/api/admin/student/${studentId}/classes`);
        console.log("Fetched classes:", response.data.content);
        setClasses(response.data.content);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, [studentId]);

  return (
    <Card className="p-4 shadow-sm">
      <h5>Registered Classes</h5>
      <Table hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Class Name</th>
            <th>Teacher</th>
            <th>Joined Date</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls, index) => (
            <tr key={cls.classroomId}>
              <td>{index + 1}</td>
              <td>{cls.classroomName}</td>
              <td>{cls.teacherName}</td>
              <td>{new Date(cls.joinedDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default StudentClasses;

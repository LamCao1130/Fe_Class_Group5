import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  InputGroup,
  Form,
  Pagination,
} from "react-bootstrap";
import { Edit, Trash2, Plus, Search } from "lucide-react";
import axiosApi from "../../../components/AxiosApi";
import styles from "./Students.module.css";
import { Modal } from "react-bootstrap";
import CreateStudent from "./CreateStudent";
import EditStudent from "./EditStudent";
const Students = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    address: "",
    dateOfBirth: "",
    role: 1,
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const itemsPerPage = 10;

  const studentsData = async () => {
    try {
      const data = await axiosApi.get(
        "http://localhost:8080/api/admin/student"
      );
      console.log("Fetched student data:", data.data);
      setStudents(data.data.content || []);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };
  useEffect(() => {
    studentsData();
  }, []);

  const filteredStudents = students.filter(
    (student) =>
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  const handleEdit = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const handleDelete = async (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        console.log(typeof studentId);
        await axiosApi.patch(
          `http://localhost:8080/api/admin/delete/${studentId}`
        );
        alert("Student deleted successfully!");
        studentsData();
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Failed to delete student.");
      }
    }
  };

  const handleAddStudent = () => {
    setShowModal(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedStudent({ ...selectedStudent, [name]: value });
  };

  const handleSaveEdit = async () => {
    try {
      const payload = {
        ...selectedStudent,
        roleId: 1,
      };
      await axiosApi.put(
        `http://localhost:8080/api/admin/edit/${selectedStudent.id}`,
        payload
      );
      alert("Student updated successfully!");
      setShowEditModal(false);
      studentsData();
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Failed to update student.");
    }
  };
  const handleSubmit = async () => {
    try {
      const payload = {
        ...newStudent,
        roleId: Number(newStudent.role),
        dateOfBirth: newStudent.dateOfBirth,
      };
      console.log("name:", typeof payload.fullName);
      console.log("DateOfBirth:  ", typeof payload.dateOfBirth);
      console.log("Role", typeof payload.role);
      console.log("Submitting new student:", payload);

      const response = await axiosApi.post(
        "http://localhost:8080/api/admin/create",
        payload
      );
      alert("Student created successfully!");
      setShowModal(false);
      studentsData();
      setNewStudent({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        address: "",
        dateOfBirth: "",
        role: "1",
      });
    } catch (error) {
      console.error("Error creating student:", error);
      alert("Failed to create student.");
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={currentPage === i}
          onClick={() => handlePageChange(i)}
          style={{ cursor: "pointer" }}
        >
          {i}
        </Pagination.Item>
      );
    }
    return pages;
  };

  return (
    <Container fluid className={styles.page}>
      <Row className="mb-4">
        <Col>
          <h2 className={`${styles.pageTitle} mb-0`}>Student Management</h2>
        </Col>
        <Col xs="auto">
          <div className={styles.controls}>
            <InputGroup className={styles.searchGroup}>
              <InputGroup.Text>
                <Search size={16} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
            <Button
              variant="primary"
              onClick={handleAddStudent}
              className={styles.createBtn}
            >
              <Plus size={16} className="me-2" />
              Create Student
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className={`border-0 shadow-sm ${styles.cardTable}`}>
            <Card.Body className="p-0">
              <Table responsive hover className={`mb-0 ${styles.studentTable}`}>
                <thead className="table-light">
                  <tr>
                    <th className="border-0 px-3 py-3">ID</th>
                    <th className="border-0 px-3 py-3">Name</th>
                    <th className="border-0 px-3 py-3">Email</th>
                    <th className="border-0 px-3 py-3">Phone</th>
                    <th className="border-0 px-3 py-3">Class</th>
                    <th className="border-0 px-3 py-3">Status</th>
                    <th className="border-0 px-3 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStudents.map((student, index) => (
                    <tr key={student.id}>
                      <td className="px-3 py-3">{index + 1}</td>
                      <td className="px-3 py-3 fw-semibold">
                        {student.fullName}
                      </td>
                      <td className="px-3 py-3">{student.email}</td>
                      <td className="px-3 py-3">{student.phoneNumber}</td>
                      <td className="px-3 py-3">{student.numberClass}</td>
                      <td className="px-3 py-3">
                        {student.status === 1 ? (
                          <span className={styles.statusActive}>Active</span>
                        ) : (
                          <span className="text-danger fw-semibold">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-center">
                        <div className={styles.actionsWrap}>
                          <Button
                            variant="light"
                            size="sm"
                            onClick={() => handleEdit(student.id)}
                            className={`${styles.btnIcon} ${styles.btnEdit}`}
                          >
                            <Edit size={14} />
                          </Button>
                          <Button
                            variant="light"
                            size="sm"
                            onClick={() => handleDelete(student.id)}
                            className={`${styles.btnIcon} ${styles.btnDelete}`}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <small className={styles.summaryText}>
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredStudents.length)} of{" "}
              {filteredStudents.length} students
            </small>
            <Pagination className={styles.paginationCustom}>
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {renderPagination()}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </Col>
      </Row>

      <CreateStudent
        show={showModal}
        handleClose={() => setShowModal(false)}
        newStudent={newStudent}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <EditStudent
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        studentData={selectedStudent}
        handleInputChange={handleEditInputChange}
        handleSave={handleSaveEdit}
      />
    </Container>
  );
};

export default Students;

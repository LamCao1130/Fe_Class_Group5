import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import ExamHistory from "./ExamHistory";
import StudentClasses from "./StudentClasses";
import AssignmentHistory from "./AssignmentHistory"; 

import axiosApi from "../../../components/AxiosApi";

const StudentDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("assignment");
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axiosApi.get(`http://localhost:8080/api/admin/student/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student detail:", error);
      }
    };
    fetchStudent();
  }, [id]);

  if (!student) return <p className="text-center mt-5">Loading student details...</p>;

  const styles = {
    headerCard: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      borderRadius: '12px'
    },
    headerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '2rem'
    },
    studentInfo: {
      flex: '0 0 auto',
      padding: '0.5rem 1.5rem',
      background: 'rgba(255, 255, 255, 0.15)',
      borderRadius: '10px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    studentName: {
      fontSize: '1.75rem',
      fontWeight: 700,
      margin: 0,
      color: 'white',
      lineHeight: 1.3
    },
    studentEmail: {
      fontSize: '0.95rem',
      margin: '0.5rem 0 0 0',
      color: 'rgba(255, 255, 255, 0.9)',
      fontWeight: 400
    },
    tabButtons: {
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'center'
    },
    tabBtn: {
      padding: '0.625rem 1.5rem',
      fontWeight: 500,
      fontSize: '0.95rem',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      background: 'transparent',
      color: 'white',
      whiteSpace: 'nowrap'
    },
    tabBtnActive: {
      background: 'white',
      color: '#667eea',
      borderColor: 'white',
      fontWeight: 600
    }
  };

  return (
    <Container fluid className="mt-4">
      {/* Header Section */}
      <Row className="mb-4">
        <Col>
          <Card style={styles.headerCard} className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <div style={styles.headerContent} className="student-detail-header-content">
                {/* Student Info */}
                <div style={styles.studentInfo} className="student-detail-info">
                  <h2 style={styles.studentName} className="student-detail-name">
                    {student.fullName}
                  </h2>
                  <p style={styles.studentEmail} className="student-detail-email">
                    {student.email}
                  </p>
                </div>

                {/* Tab Buttons */}
                <div style={styles.tabButtons} className="student-detail-tab-buttons">
                  <Button
                    style={{
                      ...styles.tabBtn,
                      ...(activeTab === "assignment" ? styles.tabBtnActive : {})
                    }}
                    className="student-detail-tab-btn"
                    onClick={() => setActiveTab("assignment")}
                  >
                    Assignment History
                  </Button>
                  <Button
                    style={{
                      ...styles.tabBtn,
                      ...(activeTab === "classes" ? styles.tabBtnActive : {})
                    }}
                    className="student-detail-tab-btn"
                    onClick={() => setActiveTab("classes")}
                  >
                    Registered Classes
                  </Button>
                  <Button
                    style={{
                      ...styles.tabBtn,
                      ...(activeTab === "history" ? styles.tabBtnActive : {})
                    }}
                    className="student-detail-tab-btn"
                    onClick={() => setActiveTab("history")}
                  >
                    Tests History
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Content Section */}
      <Row>
        <Col>
          {activeTab === "assignment" && <AssignmentHistory studentId={id} />}
          {activeTab === "classes" && <StudentClasses studentId={id} />}
          {activeTab === "history" && <ExamHistory studentId={id} />}
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDetail;

import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Tab, Nav, Table, Button, Badge } from 'react-bootstrap'
import { ArrowLeft, User, BookOpen, FileText, ClipboardList } from 'lucide-react'

const TeacherDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // Mock data – replace with API fetch in real app
  const teacher = {
    id,
    name: 'Nguyễn Văn A',
    email: 'teacherA@example.com',
    phone: '0123456789',
    totalClasses: 5,
    totalLessons: 25,
  }

  const classes = [
    { id: 'C101', name: 'IELTS Foundation', students: 20, status: 'active' },
    { id: 'C102', name: 'IELTS Reading Boost', students: 15, status: 'active' },
    { id: 'C103', name: 'IELTS Writing Intensive', students: 12, status: 'paused' },
  ]

  const exercises = [
    { id: 'E201', title: 'Reading Practice 1', lesson: 'Reading #1', submissions: 30 },
    { id: 'E202', title: 'Listening Practice 1', lesson: 'Listening #1', submissions: 28 },
  ]

  const tests = [
    { id: 'T301', title: 'IELTS Mock Test 1', date: '2025-09-01', participants: 40 },
    { id: 'T302', title: 'IELTS Mock Test 2', date: '2025-10-01', participants: 38 },
  ]

  const getStatusVariant = (status) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'paused':
        return 'warning'
      case 'archived':
        return 'secondary'
      default:
        return 'secondary'
    }
  }

  return (
    <Container fluid>
      <Row className="mb-4 align-items-center">
        <Col className="d-flex align-items-center gap-2">
          <Button variant="outline-secondary" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} className="me-1" /> Back
          </Button>
          <h2 className="fw-bold text-dark mb-0">Teacher Detail</h2>
        </Col>
      </Row>

      <Tab.Container defaultActiveKey="info">
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-white border-0 pb-0">
            <Nav variant="tabs" className="flex-nowrap overflow-auto">
              <Nav.Item>
                <Nav.Link eventKey="info" className="d-flex align-items-center">
                  <User size={18} className="me-2" /> Teacher Information
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="classes" className="d-flex align-items-center">
                  <BookOpen size={18} className="me-2" /> Classes
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="exercises" className="d-flex align-items-center">
                  <FileText size={18} className="me-2" /> Exercises
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tests" className="d-flex align-items-center">
                  <ClipboardList size={18} className="me-2" /> Tests
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Tab.Content>
              <Tab.Pane eventKey="info">
                <Card className="border-0 shadow-sm">
                  <Card.Header className="bg-white border-0">
                    <h5 className="fw-bold mb-0">Teacher Information</h5>
                  </Card.Header>
                  <Card.Body>
                    <Row className="mb-2">
                      <Col md={6}><strong>ID:</strong> {teacher.id}</Col>
                      <Col md={6}><strong>Name:</strong> {teacher.name}</Col>
                    </Row>
                    <Row className="mb-2">
                      <Col md={6}><strong>Email:</strong> {teacher.email}</Col>
                      <Col md={6}><strong>Phone:</strong> {teacher.phone}</Col>
                    </Row>
                    <Row>
                      <Col md={6}><strong>Total Classes:</strong> {teacher.totalClasses}</Col>
                      <Col md={6}><strong>Total Lessons:</strong> {teacher.totalLessons}</Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="classes">
                <Card className="border-0 shadow-sm">
                  <Card.Header className="bg-white border-0">
                    <h5 className="fw-bold mb-0">Classes Managed</h5>
                  </Card.Header>
                  <Card.Body className="p-0">
                    <Table responsive hover className="mb-0">
                      <thead className="table-light">
                        <tr>
                          <th className="border-0 px-3 py-3">Class ID</th>
                          <th className="border-0 px-3 py-3">Name</th>
                          <th className="border-0 px-3 py-3">Students</th>
                          <th className="border-0 px-3 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {classes.map((c) => (
                          <tr key={c.id}>
                            <td className="px-3 py-3">{c.id}</td>
                            <td className="px-3 py-3 fw-medium">{c.name}</td>
                            <td className="px-3 py-3">{c.students}</td>
                            <td className="px-3 py-3"><Badge bg={getStatusVariant(c.status)}>{c.status}</Badge></td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="exercises">
                <Card className="border-0 shadow-sm">
                  <Card.Header className="bg-white border-0">
                    <h5 className="fw-bold mb-0">Exercises</h5>
                  </Card.Header>
                  <Card.Body className="p-0">
                    <Table responsive hover className="mb-0">
                      <thead className="table-light">
                        <tr>
                          <th className="border-0 px-3 py-3">Exercise ID</th>
                          <th className="border-0 px-3 py-3">Title</th>
                          <th className="border-0 px-3 py-3">Lesson</th>
                          <th className="border-0 px-3 py-3">Submissions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {exercises.map((e) => (
                          <tr key={e.id}>
                            <td className="px-3 py-3">{e.id}</td>
                            <td className="px-3 py-3 fw-medium">{e.title}</td>
                            <td className="px-3 py-3">{e.lesson}</td>
                            <td className="px-3 py-3">{e.submissions}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="tests">
                <Card className="border-0 shadow-sm">
                  <Card.Header className="bg-white border-0">
                    <h5 className="fw-bold mb-0">Tests</h5>
                  </Card.Header>
                  <Card.Body className="p-0">
                    <Table responsive hover className="mb-0">
                      <thead className="table-light">
                        <tr>
                          <th className="border-0 px-3 py-3">Test ID</th>
                          <th className="border-0 px-3 py-3">Title</th>
                          <th className="border-0 px-3 py-3">Date</th>
                          <th className="border-0 px-3 py-3">Participants</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tests.map((t) => (
                          <tr key={t.id}>
                            <td className="px-3 py-3">{t.id}</td>
                            <td className="px-3 py-3 fw-medium">{t.title}</td>
                            <td className="px-3 py-3">{t.date}</td>
                            <td className="px-3 py-3">{t.participants}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Card.Body>
        </Card>
      </Tab.Container>
    </Container>
  )
}

export default TeacherDetail



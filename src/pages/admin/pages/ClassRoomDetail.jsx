import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Tab, Nav, Table, Button, Badge } from 'react-bootstrap'
import { ArrowLeft, Users, BookOpen, FileText, ClipboardList, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { adminApi } from '../../../components/api/adminApi'
import { toast, ToastContainer } from 'react-toastify'

const ClassRoomDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [classRoom, setClassRoom] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await adminApi.getClassRoomDetailById(id)
                setClassRoom(res)
            } catch (error) {
                console.error("Fetch ClassRoom Detail failed:", error)
                toast.error(`Class ID ${id} not found or server error.`)
                setClassRoom(null)
            }
        }
        fetchData()
    }, [id])

    const getStatusVariant = (status) => {
        switch (status?.toString()?.toLowerCase()) {
            case '1':
            case 'active':
                return 'success'
            case '0':
            case 'inactive':
            case 'paused':
                return 'warning'
            case 'archived':
                return 'secondary'
            default:
                return 'secondary'
        }
    }

    if (!classRoom) {
        return (
            <Container fluid className="mt-5">
                <Button variant="outline-secondary" onClick={() => navigate(-1)} className="mb-3">
                    <ArrowLeft size={16} className="me-1" /> Back to list
                </Button>
                <Card className="border-0 shadow-sm p-4">
                    <h4 className="text-danger">Class information not found.</h4>
                    <p>ID {id} does not exist or has been deleted.</p>
                </Card>
            </Container>
        )
    }

    const totalStudents = classRoom.students?.length ?? 0
    const totalLessons = classRoom.lessons?.length ?? 0
    const totalExams = classRoom.exams?.length ?? 0

    return (
        <Container fluid>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            <Row className="mb-4 align-items-center">
                <Col className="d-flex align-items-center gap-2">
                    <Button variant="outline-secondary" size="sm" onClick={() => navigate(-1)}>
                        <ArrowLeft size={16} className="me-1" /> Back
                    </Button>
                    <h2 className="fw-bold text-dark mb-0">
                        Class Details: {classRoom.name} ({classRoom.code})
                    </h2>
                </Col>
            </Row>

            <Tab.Container defaultActiveKey="info">
                <Card className="border-0 shadow-sm">
                    <Card.Header className="bg-white border-0 pb-0">
                        <Nav variant="tabs" className="flex-nowrap overflow-auto">
                            <Nav.Item>
                                <Nav.Link eventKey="info" className="d-flex align-items-center">
                                    <BookOpen size={18} className="me-2" /> General Info
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="students" className="d-flex align-items-center">
                                    <Users size={18} className="me-2" /> Students ({totalStudents})
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="lessons" className="d-flex align-items-center">
                                    <FileText size={18} className="me-2" /> Lessons ({totalLessons})
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="exams" className="d-flex align-items-center">
                                    <ClipboardList size={18} className="me-2" /> Exams ({totalExams})
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>

                    <Card.Body>
                        <Tab.Content>
                            <Tab.Pane eventKey="info">
                                <Card className="border-0 shadow-sm">
                                    <Card.Header className="bg-white border-0">
                                        <h5 className="fw-bold mb-0">Class Information</h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row className="mb-2">
                                            <Col md={6}><strong>Class ID:</strong> {classRoom.id}</Col>
                                            <Col md={6}><strong>Class Code:</strong> {classRoom.code}</Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col md={6}><strong>Class Name:</strong> {classRoom.name}</Col>
                                            <Col md={6}><strong>Teacher:</strong> {classRoom.teacherName || 'N/A'}</Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col md={6}><strong>Total Students:</strong> {totalStudents}</Col>
                                            <Col md={6}><strong>Total Lessons:</strong> {totalLessons}</Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col md={6}><strong>Total Exams:</strong> {totalExams}</Col>
                                            <Col md={6}>
                                                <strong>Status:</strong>
                                                <Badge bg={getStatusVariant(classRoom.status)} className="ms-2">
                                                    {classRoom.status === '1' ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>

                            <Tab.Pane eventKey="students">
                                <Card className="border-0 shadow-sm">
                                    <Card.Header className="bg-white border-0">
                                        <h5 className="fw-bold mb-0">Students List</h5>
                                    </Card.Header>
                                    <Card.Body className="p-0">
                                        <Table responsive hover className="mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Full Name</th>
                                                    <th>Email</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {classRoom.students?.map((st, index) => (
                                                    <tr key={st.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{st.fullName}</td>
                                                        <td>{st.email}</td>
                                                        <td>
                                                            <Badge bg={getStatusVariant(st.status)}>
                                                                {st.status === '1' ? 'Active' : 'Inactive'}
                                                            </Badge>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {totalStudents === 0 && (
                                                    <tr>
                                                        <td colSpan="4" className="text-center py-3 text-muted">
                                                            No students enrolled in this class.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>

                            <Tab.Pane eventKey="lessons">
                                <Card className="border-0 shadow-sm">
                                    <Card.Header className="bg-white border-0">
                                        <h5 className="fw-bold mb-0">Lessons</h5>
                                    </Card.Header>
                                    <Card.Body>
                                        {classRoom.lessons && classRoom.lessons.length > 0 ? (
                                            <Table responsive hover size="sm">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Title</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {classRoom.lessons.map(lesson => (
                                                        <tr key={lesson.id}>
                                                            <td>{lesson.id}</td>
                                                            <td>{lesson.title}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        ) : (
                                            <p className="text-muted">No lessons in this class.</p>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>

                            <Tab.Pane eventKey="exams">
                                <Card className="border-0 shadow-sm">
                                    <Card.Header className="bg-white border-0">
                                        <h5 className="fw-bold mb-0">Exams</h5>
                                    </Card.Header>
                                    <Card.Body>
                                        {classRoom.exams && classRoom.exams.length > 0 ? (
                                            <Table responsive hover size="sm">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Title</th>
                                                        <th>Type</th>
                                                        <th>Duration</th>
                                                        <th>Date</th>
                                                        <th>Total Marks</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {classRoom.exams.map(exam => (
                                                        <tr key={exam.id}>
                                                            <td>{exam.id}</td>
                                                            <td>{exam.title}</td>
                                                            <td>{exam.examType}</td>
                                                            <td>{exam.durationMinutes} min</td>
                                                            <td>{new Date(exam.examDate).toLocaleDateString()}</td>
                                                            <td>{exam.totalMarks}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        ) : (
                                            <p className="text-muted">No exams in this class.</p>
                                        )}
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

export default ClassRoomDetail

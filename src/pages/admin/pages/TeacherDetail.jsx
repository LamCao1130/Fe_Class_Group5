import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Tab, Nav, Table, Button, Badge } from 'react-bootstrap'
import { ArrowLeft, User, BookOpen, FileText, ClipboardList } from 'lucide-react'
import { useEffect, useState } from 'react'
import { adminApi } from '../../../components/api/adminApi';
import { toast, ToastContainer } from 'react-toastify';

const TeacherDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [teacher, setTeacher] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await adminApi.getTeacherAccountAndClassesById(id);
                setTeacher(res);
            } catch (error) {
                console.error("Fetch Teacher Detail failed:", error);
                toast.error(`Teacher ID ${id} not found or server error.`);
                setTeacher(null);
            }
        };
        fetchData();
    }, [id]);

    const getStatusVariant = (status) => {
        switch (status?.toString()?.toLowerCase()) {
            case '1':
            case 'active':
                return 'success';
            case '0':
            case 'inactive':
            case 'paused':
                return 'warning';
            case 'archived':
                return 'secondary';
            default:
                return 'secondary';
        }
    };

    if (!teacher) {
        return (
            <Container fluid className="mt-5">
                <Button variant="outline-secondary" onClick={() => navigate(-1)} className="mb-3">
                    <ArrowLeft size={16} className="me-1" /> Back to list
                </Button>
                <Card className="border-0 shadow-sm p-4">
                    <h4 className="text-danger">Teacher information not found.</h4>
                    <p>ID {id} does not exist or has been deleted.</p>
                </Card>
            </Container>
        );
    }

    const totalClassesCount = teacher.classRooms?.length ?? 0;
    const totalLessonsCount = teacher.classRooms?.reduce((sum, cls) => sum + (cls.lessons?.length ?? 0), 0) ?? 0;
    const totalExamsCount = teacher.classRooms?.reduce((sum, cls) => sum + (cls.exams?.length ?? 0), 0) ?? 0;

    return (
        <Container fluid>
            <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} />
            <Row className="mb-4 align-items-center">
                <Col className="d-flex align-items-center gap-2">
                    <Button variant="outline-secondary" size="sm" onClick={() => navigate(-1)}>
                        <ArrowLeft size={16} className="me-1" /> Back
                    </Button>
                    <h2 className="fw-bold text-dark mb-0">Teacher Details: {teacher.fullName}</h2>
                </Col>
            </Row>

            <Tab.Container defaultActiveKey="info">
                <Card className="border-0 shadow-sm">
                    <Card.Header className="bg-white border-0 pb-0">
                        <Nav variant="tabs" className="flex-nowrap overflow-auto">
                            <Nav.Item>
                                <Nav.Link eventKey="info" className="d-flex align-items-center">
                                    <User size={18} className="me-2" /> General Info
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="classes" className="d-flex align-items-center">
                                    <BookOpen size={18} className="me-2" /> Classes ({totalClassesCount})
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="exercises" className="d-flex align-items-center">
                                    <FileText size={18} className="me-2" /> Lessons ({totalLessonsCount})
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="tests" className="d-flex align-items-center">
                                    <ClipboardList size={18} className="me-2" /> Exams ({totalExamsCount})
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>

                    <Card.Body>
                        <Tab.Content>
                            <Tab.Pane eventKey="info">
                                <Card className="border-0 shadow-sm">
                                    <Card.Header className="bg-white border-0">
                                        <h5 className="fw-bold mb-0">Personal and Account Info</h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row className="mb-2">
                                            <Col md={6}><strong>ID:</strong> {teacher.id}</Col>
                                            <Col md={6}><strong>Full Name:</strong> {teacher.fullName}</Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col md={6}><strong>Email:</strong> {teacher.email}</Col>
                                            <Col md={6}><strong>Phone:</strong> {teacher.phoneNumber}</Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col md={6}><strong>Address:</strong> {teacher.address || 'N/A'}</Col>
                                            <Col md={6}><strong>Date of Birth:</strong> {teacher.dateOfBirth}</Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col md={6}>
                                                <strong>Status:</strong>
                                                <Badge bg={getStatusVariant(teacher.status)} className="ms-2">
                                                    {teacher.status === 1 ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </Col>
                                            <Col md={6}>
                                                <strong>Role:</strong> {teacher.roleName}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}><strong>Total Classes:</strong> {totalClassesCount}</Col>
                                            <Col md={6}><strong>Total Lessons:</strong> {totalLessonsCount}</Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>

                            <Tab.Pane eventKey="classes">
                                <Card className="border-0 shadow-sm">
                                    <Card.Header className="bg-white border-0">
                                        <h5 className="fw-bold mb-0">Classes Taught</h5>
                                    </Card.Header>
                                    <Card.Body className="p-0">
                                        <Table responsive hover className="mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th className="border-0 px-3 py-3">Class Code</th>
                                                    <th className="border-0 px-3 py-3">Class Name</th>
                                                    <th className="border-0 px-3 py-3">Students</th>
                                                    <th className="border-0 px-3 py-3">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {teacher.classRooms?.map(cls => (
                                                    <tr key={cls.id}>
                                                        <td className="px-3 py-3">{cls.code}</td>
                                                        <td className="px-3 py-3 fw-medium">{cls.name}</td>
                                                        <td className="px-3 py-3">{cls.studentCount ?? 0}</td>
                                                        <td className="px-3 py-3">
                                                            <Badge bg={getStatusVariant(cls.status)}>
                                                                {cls.status === 1 ? "Active" : "Inactive"}
                                                            </Badge>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {totalClassesCount === 0 && (
                                                    <tr>
                                                        <td colSpan="4" className="text-center py-3 text-muted">
                                                            This teacher is not assigned to any classes yet.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>

                            <Tab.Pane eventKey="exercises">
                                <Card className="border-0 shadow-sm">
                                    <Card.Header className="bg-white border-0">
                                        <h5 className="fw-bold mb-0">Lessons List</h5>
                                    </Card.Header>
                                    <Card.Body>
                                        {teacher.classRooms?.map(cls => (
                                            <div key={cls.id} className="mb-4">
                                                <h6 className="fw-bold text-primary mb-2">
                                                    {cls.name} ({cls.code})
                                                </h6>
                                                {cls.lessons && cls.lessons.length > 0 ? (
                                                    <Table responsive hover size="sm">
                                                        <thead className="table-light">
                                                            <tr>
                                                                <th>ID</th>
                                                                <th>Lesson Name</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {cls.lessons.map(lesson => (
                                                                <tr key={lesson.id}>
                                                                    <td>{lesson.id}</td>
                                                                    <td>{lesson.title}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                ) : (
                                                    <p className="text-muted">No lessons available in this class.</p>
                                                )}
                                            </div>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>

                            <Tab.Pane eventKey="tests">
                                <Card className="border-0 shadow-sm">
                                    <Card.Header className="bg-white border-0">
                                        <h5 className="fw-bold mb-0">Exams List</h5>
                                    </Card.Header>
                                    <Card.Body>
                                        {teacher.classRooms?.map(cls => (
                                            <div key={cls.id} className="mb-4">
                                                <h6 className="fw-bold text-primary mb-2">
                                                    {cls.name} ({cls.code})
                                                </h6>
                                                {cls.exams && cls.exams.length > 0 ? (
                                                    <Table responsive hover size="sm">
                                                        <thead className="table-light">
                                                            <tr>
                                                                <th>ID</th>
                                                                <th>Exam Name</th>
                                                                <th>Type</th>
                                                                <th>Duration</th>
                                                                <th>Date</th>
                                                                <th>Total Marks</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {cls.exams.map(exam => (
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
                                                    <p className="text-muted">No exams available in this class.</p>
                                                )}
                                            </div>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>

                        </Tab.Content>
                    </Card.Body>
                </Card>
            </Tab.Container>
        </Container>
    );

};

export default TeacherDetail;

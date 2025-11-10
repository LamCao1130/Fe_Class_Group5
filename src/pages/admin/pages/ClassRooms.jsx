import { use, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Table, Button, InputGroup, Form, Pagination, Badge, Modal } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import { Edit, Trash2, Plus, Search, RefreshCcw } from 'lucide-react'
import { adminApi } from '../../../components/api/adminApi'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const ClassRooms = () => {
    const [classRooms, setClassRooms] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [lgShow, setLgShow] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [selectedClassId, setSelectedClassId] = useState(null)
    const navigate = useNavigate()

    const classroomSchema = z.object({
        name: z.string()
        .min(1, {message: "Please input class name"}),
        title: z.string()
        .min(1, {message: "Please input class title"}),
        code: z.string()
        .min(1, {message: "Please input class code"})
        .regex(/^[A-Z0-9]+$/,{message: "Code only containt Numer and Alphabet"}),
        teacherId: z.number({message: "Please choose one teacher"}),
    });

    const { register, handleSubmit, reset, formState: { erros, isSubmitting } } = useForm({
        resolver: zodResolver(classroomSchema),
        defaultValues: {
            name: '',
            title: '',
            code: '',
            teacherId: '',
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await adminApi.getAllClassRoom(page, size);
                console.log(res);
                setClassRooms(res.content)
                setTotalPages(res.totalPages)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData();
    }, [page, size])

    const filteredClasses = classRooms.filter(c =>
        (c.name ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.code ?? '').toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleAdd = () => {
        setIsEdit(false)
        reset()
        setLgShow(true)
    }

    const handleEdit = (id) => {
        const c = classRooms.find(cls => cls.id === id)
        reset({ className: c.className, description: c.description, teacherId: c.teacherId })
        setSelectedClassId(id)
        setIsEdit(true)
        setLgShow(true)
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure to delete this class?")) return
        try {
            await adminApi.deleteClassRoom(id)
            toast.success("Class deleted")
            const res = await adminApi.getAllClassRooms(page, size)
            setClassRooms(res.content)
        } catch (err) {
            toast.error("Failed to delete class")
        }
    }

    const handleRestore = async (id) => {
        if (!window.confirm("Restore this class?")) return
        try {
            await adminApi.restoreClassRoom(id)
            toast.success("Class restored")
            const res = await adminApi.getAllClassRooms(page, size)
            setClassRooms(res.content)
        } catch (err) {
            toast.error("Failed to restore")
        }
    }

    const onSubmit = async (data) => {
        try {
            if (isEdit) {
                await adminApi.updateClassRoom(selectedClassId, data)
                toast.success("Updated successfully")
            } else {
                await adminApi.createClassRoom(data)
                toast.success("Created successfully")
            }
            setLgShow(false)
            const res = await adminApi.getAllClassRooms(page, size)
            setClassRooms(res.content)
        } catch (err) {
            toast.error("Error saving class")
        }
    }

    const handlePageChange = (page) => {
        setPage(page - 1);
        setCurrentPage(page);
    }

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
            )
        }
        return pages;

    }

    return (
        <> <ToastContainer position='top-right' autoClose={3000} /> <Container fluid> <Row className="mb-4"> <Col><h2 className="fw-bold text-dark mb-0">Classrooms Management</h2></Col> <Col xs="auto"> <div className="d-flex gap-2">
            <InputGroup style={{ width: '300px' }}>
                <InputGroup.Text><Search size={16} /></InputGroup.Text>
                <Form.Control placeholder="Search classes..." value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} /> </InputGroup> <Button variant="primary" onClick={handleAdd}> <Plus size={16} className="me-2" /> Add Class </Button> </div> </Col> </Row>

            <Card className="border-0 shadow-sm">
                <Card.Body className="p-0">
                    <Table responsive hover className="mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Class Name</th>
                                <th>Code</th>
                                <th>Teacher</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Number of students</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClasses.map(cls => (
                                <tr key={cls.id} style={{ cursor: "pointer" }}
                                    onClick={() => navigate(`/admin/classrooms/${cls.id}`)}>
                                    <td>{cls.id}</td>
                                    <td>{cls.name}</td>
                                    <td>{cls.code}</td>
                                    <td>{cls.teacherName}</td>
                                    <td>
                                        <Badge bg={cls.status === "1" ? "success" : "secondary"}>
                                            {cls.status === "1" ? "Active" : "Inactive"}
                                        </Badge>
                                    </td>
                                    <td>{cls.createdDate}</td>
                                    <td>{cls.studentCount}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Button variant="outline-warning" size="sm" onClick={(e) => {
                                                e.stopPropagation();
                                                handleEdit(cls.id)
                                            }}>
                                                <Edit size={14} />
                                            </Button>
                                            {cls.status === "1" ? (
                                                <Button variant="outline-danger" size="sm" onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(cls.id)
                                                }}>
                                                    <Trash2 size={14} />
                                                </Button>
                                            ) : (
                                                <Button variant="outline-primary" size="sm" onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRestore(cls.id);
                                                }}>
                                                    <RefreshCcw size={14} />
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* Paginaton */}
            <Row className='mt-4'>
                <Col>
                    <Pagination className='justify-content-center'>
                        <Pagination.Prev onClick={() => {
                            setPage(page - 1);
                            setCurrentPage(page);
                        }
                        }
                            disabled={page === 0} />
                        {renderPagination()}
                        <Pagination.Next onClick={() => {
                            setPage(page + 1);
                            setCurrentPage(page + 2);
                        }}
                            disabled={page + 1 === totalPages} />
                    </Pagination>
                </Col>
            </Row>
        </Container>

            {/* Modal */}
            <Modal size="lg" show={lgShow} onHide={() => setLgShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEdit ? "Edit Class" : "Add Class"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className='mb-3' controlId='className'>
                            <Form.Label>Class Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter class name' 
                            {...register("name")}
                            isInvalid={!!erros.name}
                            />
                            <Form.Control.Feedback type='invalid'>{erros.name?.message}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type='text' placeholder='Enter title' 
                            {...register("title")}
                            isInvalid={!!erros.title}
                            />
                            <Form.Control.Feedback type='invalid'>{erros.title?.message}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='code'>
                            <Form.Label>Code</Form.Label>
                            <Form.Control type='text' placeholder='Enter classroom code'
                             {...register("code")}
                             isInvalid={!!erros.code}
                             />
                             <Form.Control.Feedback type='invalid'>{erros.code?.message}</Form.Control.Feedback>
                        </Form.Group>

                        
                        <div className='d-flex justify-content-end gap-3'>
                            <Button type='submit' disabled={isSubmitting}>{isEdit ? "Update" : "Submit"}</Button>
                            <Button variant='secondary' onClick={() => setLgShow(false)}>Close</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>

    )
}

export default ClassRooms

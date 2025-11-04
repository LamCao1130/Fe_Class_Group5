import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Container, Row, Col, Card, Table, Button, InputGroup, Form, Pagination, Badge, Modal, FormLabel, FormControl } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import { Edit, Trash2, Plus, Search, RefreshCcw, Eye } from 'lucide-react'
import { adminApi } from '../../../components/api/adminApi'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'


const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const [lgShow, setLgShow] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [selectedTeacherId, setSelectedTeacherId] = useState(null)

  const teacherScheme = z.object({
    fullName: z.string()
      .min(1, { message: "Please input fullname" }),
    email: z.string()
      .min(1, { message: "Please input email" })
      .email({ message: "please input true form of email" }),
    phoneNumber: z.string()
      .min(1, { message: "please input phone number" })
      .length(10, { message: "Phone number must be exactly 10 digits" })
      .regex(/^[0-9]+$/, { message: "phone only contain number" }),
    address: z.string()
      .min(1, { message: "please input address" }),
    dateOfBirth: z.string()
      .min(1, { message: "please input date of birth" }),
    roleId: z.number().int().min(1, { message: "roleId must chosen" }).default(2),
  });

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(teacherScheme),
    defaultValues: {
      roleId: 2,
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
      dateOfBirth: '',
    }
  });



  const filteredTeachers = teachers.filter(teacher =>
    (teacher.fullName ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  )


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await adminApi.getAllTeacherAccount(page, size);
        setTeachers(res.content);
        setTotalPages(res.totalPages);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [page, size])

  const handleEdit = (teacherId) => {
    console.log("handleEdit");
    const teacherToEdit = teachers.find(t => t.id === teacherId)

    reset({
      fullName: teacherToEdit.fullName,
      email: teacherToEdit.email,
      phoneNumber: teacherToEdit.phoneNumber,
      address: teacherToEdit.address,
      dateOfBirth: teacherToEdit.dateOfBirth,
      roleId: 2
    });

    setIsEdit(true);
    setSelectedTeacherId(teacherId);
    setLgShow(true);
  }

  const handleView = (teacherId) => {
    navigate(`/admin/teachers/${teacherId}`);
  }

  const handleDelete = async (teacherId) => {
    if (!window.confirm("Are you sure you want to delete this teacher account?")) {
      return;
    }
    try {
      const res = await adminApi.deleteTeacherAccount(teacherId);
      setTeachers(prevTeachers =>
        prevTeachers.map(t =>
          t.id === teacherId ? { ...t, ...res } : t
        )
      );
      toast.success("Delete teacher successfull");
    } catch (error) {
      console.error(error);
      toast.error("Can not delete teacher account");
    }
  }


  const handleRestore = async (teacherId) => {
    if (!window.confirm("Are you sure you want to restore this teacher account?")) {
      return;
    }
    try {
      const res = await adminApi.restoreTeacherAccount(teacherId);
      setTeachers(prevTeachers =>
        prevTeachers.map(t =>
          t.id === teacherId ? { ...t, ...res } : t
        )
      );
      toast.success("Restore teacher successfull");
    } catch (error) {
      console.log(error);
      toast.error("Can not restore teacher account");
    }
  }

  const handleAddTeacher = () => {
    setLgShow(true);
    setIsEdit(false);
    setSelectedTeacherId(null);
    reset();
  }

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        const res = await adminApi.editTeacherAccount(data, selectedTeacherId);
        setTeachers(prevTeachers =>
          prevTeachers.map(t =>
            t.id === selectedTeacherId ? { ...t, ...res } : t
          )
        );
        toast.success("Edit teacher successfull");
      } else {
        await adminApi.createTeacherAccount(data);
        const res = await adminApi.getAllTeacherAccount(page, size);
        setTeachers(res.content);
        setTotalPages(res.totalPages);
        toast.success("create teacher successfull")
      }

      reset();
      setLgShow(false);
      setIsEdit(false);
      setSelectedTeacherId(null);

    } catch (error) {
      console.log(error);
      const errorMessage = isEdit ? "Can not edit teacher" : "Can not create teacher"
      toast.error(error.response.data?.message || errorMessage);
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPage(page - 1);
  }

  const renderPagination = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={currentPage === i}
          onClick={() => handlePageChange(i)}
          style={{ cursor: 'pointer' }}
        >
          {i}
        </Pagination.Item>
      )
    }
    return pages
  }

  return (
    <>
      <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} />
      <Container fluid>
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold text-dark mb-0">Teachers Management</h2>
          </Col>
          <Col xs="auto">
            <div className="d-flex gap-2">
              <InputGroup style={{ width: '300px' }}>
                <InputGroup.Text>
                  <Search size={16} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
              <Button variant="primary" onClick={handleAddTeacher}>
                <Plus size={16} className="me-2" />
                Add Teacher
              </Button>
            </div>
          </Col>
        </Row>

        {/* Table */}
        <Row>
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-0">
                <Table responsive hover className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Status</th>
                      <th>Date of birth</th>
                      <th>Classes</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeachers.map((teacher) => (
                      <tr key={teacher.id}
                        onClick={() => handleView(teacher.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <td>{teacher.id}</td>
                        <td>{teacher.fullName}</td>
                        <td>{teacher.email}</td>
                        <td>{teacher.phoneNumber}</td>
                        <td>
                          <Badge bg={teacher.status === 1 ? 'success' : 'secondary'}>
                            {teacher.status === 1 ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                        <td>{new Date(teacher.dateOfBirth).toLocaleDateString()}</td>
                        <td>{teacher.classRoomIds?.length ?? 0}</td>
                        <td>
                          <div className="d-flex gap-2">

                            {/* edit */}
                            <Button
                              variant="outline-warning"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(teacher.id);
                              }}
                              title="Edit"
                            >
                              <Edit size={14} />
                            </Button>

                            {/* delete or restore */}
                            {teacher.status === 1 ?
                              (<Button
                                variant="outline-danger"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(teacher.id);
                                }}
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </Button>)
                              :
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRestore(teacher.id);
                                }}
                                title="Restore"
                              >
                                <RefreshCcw size={14} />
                              </Button>
                            }

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

        {/* Pagination */}
        <Row className="mt-4">
          <Col>
            <Pagination className="justify-content-center">
              <Pagination.Prev
                onClick={() => {
                  setPage(page - 1);
                  setCurrentPage(page);
                }
                }
                disabled={page === 0}
              />
              {renderPagination()}
              <Pagination.Next
                onClick={() => {
                  setPage(page + 1);
                  setCurrentPage(page + 2);
                }}
                disabled={page + 1 === totalPages}
              />
            </Pagination>
          </Col>
        </Row>
      </Container>

      {/* Modal */}
      <>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              {isEdit ? "Edit Teacher" : "Add Teacher"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>

              <Form.Group className='mb-3' controlId='fullName'>
                <Form.Label>Fullname</Form.Label>
                <Form.Control type='text' placeholder='hiuhayho'
                  {...register("fullName")}
                  isInvalid={!!errors.fullName}
                ></Form.Control>
                <Form.Control.Feedback type='invalid'>{errors.fullName?.message}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' placeholder='email@example.com'
                  {...register("email")}
                  isInvalid={!!errors.email}
                ></Form.Control>
                <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mb-3' controlId='phoneNumber'>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type='text' placeholder='1234567890'
                  {...register("phoneNumber")}
                  isInvalid={!!errors.phoneNumber}
                ></Form.Control>
                <Form.Control.Feedback type='invalid'>{errors.phoneNumber?.message}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mb-3' controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type='text' placeholder='address'
                  {...register("address")}
                  isInvalid={!!errors.address}
                ></Form.Control>
                <Form.Control.Feedback type='invalid'>{errors.address?.message}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mb-3' controlId='dateOfBirth'>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type='date' placeholder='dd-mm-yyyy'
                  {...register("dateOfBirth")}
                  isInvalid={!!errors.dateOfBirth}
                ></Form.Control>
                <Form.Control.Feedback type='invalid'>{errors.dateOfBirth?.message}</Form.Control.Feedback>
              </Form.Group>

              <div className='d-flex justify-content-end gap-3'>
                <Button type='submit' className='mt-3' variant='primary' disabled={isSubmitting}>
                  {isEdit ? "Update" : "Submit"}
                </Button>
                <Button onClick={() => {
                  setLgShow(false);
                  setIsEdit(false);
                  setSelectedTeacherId(null);
                  reset();
                }} className='mt-3' variant='secondary' disabled={isSubmitting}>
                  Close
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    </>

  )
}

export default Teachers

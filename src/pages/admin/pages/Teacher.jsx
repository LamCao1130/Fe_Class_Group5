import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Table, Button, InputGroup, Form, Pagination, Badge } from 'react-bootstrap'
import { Edit, Trash2, Plus, Search } from 'lucide-react'

const Teachers = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const itemsPerPage = 10

  // Dữ liệu mẫu cho giáo viên
  const teachersData = [
    { id: 1, name: 'Nguyễn Văn A', classes: 5, lessons: 25 },
    { id: 2, name: 'Trần Thị B', classes: 3, lessons: 18 },
    { id: 3, name: 'Lê Văn C', classes: 7, lessons: 32 },
    { id: 4, name: 'Phạm Thị D', classes: 4, lessons: 22 },
    { id: 5, name: 'Hoàng Văn E', classes: 6, lessons: 28 },
    { id: 6, name: 'Vũ Thị F', classes: 2, lessons: 15 },
    { id: 7, name: 'Đặng Văn G', classes: 8, lessons: 35 },
    { id: 8, name: 'Bùi Thị H', classes: 3, lessons: 20 },
    { id: 9, name: 'Ngô Văn I', classes: 5, lessons: 24 },
    { id: 10, name: 'Dương Thị K', classes: 4, lessons: 19 },
    { id: 11, name: 'Lý Văn L', classes: 6, lessons: 30 },
    { id: 12, name: 'Đinh Thị M', classes: 2, lessons: 12 },
    { id: 13, name: 'Phan Văn N', classes: 7, lessons: 33 },
    { id: 14, name: 'Võ Thị O', classes: 3, lessons: 17 },
    { id: 15, name: 'Trịnh Văn P', classes: 5, lessons: 26 },
    { id: 16, name: 'Đỗ Thị Q', classes: 4, lessons: 21 },
    { id: 17, name: 'Hồ Văn R', classes: 6, lessons: 29 },
    { id: 18, name: 'Lưu Thị S', classes: 2, lessons: 14 },
    { id: 19, name: 'Chu Văn T', classes: 8, lessons: 36 },
    { id: 20, name: 'Tôn Thị U', classes: 3, lessons: 16 }
  ]

  // Lọc dữ liệu theo tìm kiếm
  const filteredTeachers = teachersData.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTeachers = filteredTeachers.slice(startIndex, endIndex)

  const handleEdit = (teacherId) => {
    console.log('Edit teacher:', teacherId)
    // Logic sửa giáo viên
  }

  const handleDelete = (teacherId) => {
    console.log('Delete teacher:', teacherId)
    // Logic xóa giáo viên
  }

  const handleAddTeacher = () => {
    console.log('Add new teacher')
    // Logic thêm giáo viên mới
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
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
                    <th className="border-0 px-3 py-3">ID</th>
                    <th className="border-0 px-3 py-3">Name</th>
                    <th className="border-0 px-3 py-3">Classes</th>
                    <th className="border-0 px-3 py-3">Lessons</th>
                    <th className="border-0 px-3 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTeachers.map((teacher) => (
                    <tr key={teacher.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/teachers/${teacher.id}`)}>
                      <td className="px-3 py-3">{teacher.id}</td>
                      <td className="px-3 py-3 fw-medium">{teacher.name}</td>
                      <td className="px-3 py-3">
                        <Badge bg="info">{teacher.classes}</Badge>
                      </td>
                      <td className="px-3 py-3">
                        <Badge bg="success">{teacher.lessons}</Badge>
                      </td>
                      <td className="px-3 py-3">
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-warning"
                            size="sm"
                            onClick={() => handleEdit(teacher.id)}
                            title="Edit"
                          >
                            <Edit size={14} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(teacher.id)}
                            title="Delete"
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

      {/* Pagination */}
      <Row className="mt-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredTeachers.length)} of {filteredTeachers.length} teachers
            </small>
            <Pagination>
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
    </Container>
  )
}

export default Teachers

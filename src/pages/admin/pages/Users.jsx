import React, { useState } from 'react'
import { Container, Row, Col, Card, Table, Button, InputGroup, Form, Pagination, Badge } from 'react-bootstrap'
import { Edit, Trash2, Plus, Search } from 'lucide-react'

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const itemsPerPage = 10

  // Dữ liệu mẫu cho người dùng
  const usersData = [
    { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', phone: '0123456789', role: 'teacher' },
    { id: 2, name: 'Trần Thị B', email: 'b@example.com', phone: '0123456788', role: 'student' },
    { id: 3, name: 'Lê Văn C', email: 'c@example.com', phone: '0123456787', role: 'admin' },
    { id: 4, name: 'Phạm Thị D', email: 'd@example.com', phone: '0123456786', role: 'teacher' },
    { id: 5, name: 'Hoàng Văn E', email: 'e@example.com', phone: '0123456785', role: 'student' },
    { id: 6, name: 'Vũ Thị F', email: 'f@example.com', phone: '0123456784', role: 'student' },
    { id: 7, name: 'Đặng Văn G', email: 'g@example.com', phone: '0123456783', role: 'teacher' },
    { id: 8, name: 'Bùi Thị H', email: 'h@example.com', phone: '0123456782', role: 'student' },
    { id: 9, name: 'Ngô Văn I', email: 'i@example.com', phone: '0123456781', role: 'teacher' },
    { id: 10, name: 'Dương Thị K', email: 'k@example.com', phone: '0123456780', role: 'student' },
    { id: 11, name: 'Lý Văn L', email: 'l@example.com', phone: '0123456779', role: 'admin' },
    { id: 12, name: 'Đinh Thị M', email: 'm@example.com', phone: '0123456778', role: 'student' },
    { id: 13, name: 'Phan Văn N', email: 'n@example.com', phone: '0123456777', role: 'teacher' },
    { id: 14, name: 'Võ Thị O', email: 'o@example.com', phone: '0123456776', role: 'student' },
    { id: 15, name: 'Trịnh Văn P', email: 'p@example.com', phone: '0123456775', role: 'teacher' },
    { id: 16, name: 'Đỗ Thị Q', email: 'q@example.com', phone: '0123456774', role: 'student' },
    { id: 17, name: 'Hồ Văn R', email: 'r@example.com', phone: '0123456773', role: 'student' },
    { id: 18, name: 'Lưu Thị S', email: 's@example.com', phone: '0123456772', role: 'teacher' },
    { id: 19, name: 'Chu Văn T', email: 't@example.com', phone: '0123456771', role: 'admin' },
    { id: 20, name: 'Tôn Thị U', email: 'u@example.com', phone: '0123456770', role: 'student' }
  ]

  // Lọc dữ liệu theo tìm kiếm và role
  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentUsers = filteredUsers.slice(startIndex, endIndex)

  const handleEdit = (userId) => {
    console.log('Edit user:', userId)
    // Logic sửa người dùng
  }

  const handleDelete = (userId) => {
    console.log('Delete user:', userId)
    // Logic xóa người dùng
  }

  const handleAddUser = () => {
    console.log('Add new user')
    // Logic thêm người dùng mới
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const getRoleBadge = (role) => {
    const roleVariants = {
      admin: 'danger',
      teacher: 'primary',
      student: 'success'
    }
    return <Badge bg={roleVariants[role]}>{role}</Badge>
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
          <h2 className="fw-bold text-dark mb-0">Users Management</h2>
        </Col>
        <Col xs="auto">
          <div className="d-flex gap-2 align-items-center">
            <InputGroup style={{ width: '250px' }}>
              <InputGroup.Text>
                <Search size={16} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
            <Form.Select
              style={{ width: '150px' }}
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </Form.Select>
            <Button variant="primary" onClick={handleAddUser}>
              <Plus size={16} className="me-2" />
              Add User
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
                    <th className="border-0 px-3 py-3">Email</th>
                    <th className="border-0 px-3 py-3">Phone Number</th>
                    <th className="border-0 px-3 py-3">Role</th>
                    <th className="border-0 px-3 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-3 py-3">{user.id}</td>
                      <td className="px-3 py-3 fw-medium">{user.name}</td>
                      <td className="px-3 py-3">{user.email}</td>
                      <td className="px-3 py-3">{user.phone}</td>
                      <td className="px-3 py-3">{getRoleBadge(user.role)}</td>
                      <td className="px-3 py-3">
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-warning"
                            size="sm"
                            onClick={() => handleEdit(user.id)}
                            title="Edit"
                          >
                            <Edit size={14} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(user.id)}
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
              Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
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

export default Users

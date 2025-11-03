import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Users, BookOpen, GraduationCap, UserCheck } from 'lucide-react'

const Dashboard = () => {
const userData = [
{ name: 'Teachers', value: 25, color: '#10b981' },
{ name: 'Students', value: 150, color: '#f97316' }
]

const stats = [
{ title: 'Total Classes', value: 45, icon: BookOpen, color: '#3b82f6' },
{ title: 'Total Lessons', value: 320, icon: GraduationCap, color: '#8b5cf6' },
{ title: 'Active Teachers', value: 25, icon: UserCheck, color: '#10b981' },
{ title: 'Total Students', value: 150, icon: Users, color: '#f97316' }
]

const classData = [
{ month: 'Jan', classes: 12, students: 45 },
{ month: 'Feb', classes: 19, students: 62 },
{ month: 'Mar', classes: 15, students: 58 },
{ month: 'Apr', classes: 22, students: 78 },
{ month: 'May', classes: 18, students: 65 },
{ month: 'Jun', classes: 25, students: 85 }
]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
const radius = innerRadius + (outerRadius - innerRadius) * 0.5
const x = cx + radius * Math.cos(-midAngle * RADIAN)
const y = cy + radius * Math.sin(-midAngle * RADIAN)


return (
  <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
    {`${(percent * 100).toFixed(0)}%`}
  </text>
)


}

return ( <Container fluid> <Row className="mb-4"> <Col> <h2 className="fw-bold text-dark mb-2">Dashboard Overview</h2> <p className="text-muted">Welcome to IELTS Admin System</p> </Col> </Row>

  <Row className="mb-4">
    {stats.map((stat, index) => {
      const IconComponent = stat.icon
      return (
        <Col key={index} lg={3} md={6} className="mb-3">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div 
                className="rounded-3 d-flex align-items-center justify-content-center me-3"
                style={{ 
                  backgroundColor: stat.color, 
                  width: '48px', 
                  height: '48px' 
                }}
              >
                <IconComponent size={24} className="text-white" />
              </div>
              <div>
                <h3 className="fw-bold mb-0 text-dark">{stat.value}</h3>
                <p className="text-muted mb-0 small">{stat.title}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      )
    })}
  </Row>

  <Row>
    <Col lg={4} className="mb-4">
      <Card className="h-100 border-0 shadow-sm">
        <Card.Header className="bg-white border-0">
          <h5 className="fw-bold text-dark mb-0">User Distribution</h5>
        </Card.Header>
        <Card.Body className="text-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={userData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {userData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="d-flex justify-content-center gap-4 mt-3">
            <div className="d-flex align-items-center">
              <div 
                className="rounded-circle me-2" 
                style={{ backgroundColor: '#10b981', width: '12px', height: '12px' }}
              ></div>
              <span className="small text-muted">Teachers (25)</span>
            </div>
            <div className="d-flex align-items-center">
              <div 
                className="rounded-circle me-2" 
                style={{ backgroundColor: '#f97316', width: '12px', height: '12px' }}
              ></div>
              <span className="small text-muted">Students (150)</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
    
    <Col lg={8} className="mb-4">
      <Card className="h-100 border-0 shadow-sm">
        <Card.Header className="bg-white border-0">
          <h5 className="fw-bold text-dark mb-0">Monthly Statistics</h5>
        </Card.Header>
        <Card.Body>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={classData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="classes" fill="#0d6efd" name="Classes" />
              <Bar dataKey="students" fill="#198754" name="Students" />
            </BarChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>


)
}

export default Dashboard

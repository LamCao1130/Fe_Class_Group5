import React from 'react';
import { Nav } from 'react-bootstrap';
// Import icons (giống như trên)
import { 
  BsGridFill, 
  BsBookmarkFill, 
  BsListTask, 
  BsCalendarEventFill, 
  BsGearFill 
} from 'react-icons/bs';
import { Link } from 'react-router';
function Sidebar() {
  return (
    <Nav 
      className="flex-column bg-dark p-3" 
      data-bs-theme="dark"
      style={{ minHeight: '100vh' }}
    >
{/*       <Nav.Link 
        href="#dashboard" 
        active 
        className="d-flex align-items-center py-2"
      >
        <BsGridFill className="me-2" />
        Tổng quan
      </Nav.Link> */}
      
      <Nav.Link as={Link} to={"classRoom"} className="d-flex align-items-center py-2">
        <BsBookmarkFill className="me-2" />
        Các lớp học
      </Nav.Link>
      
      <Nav.Link href="#assignments" className="d-flex align-items-center py-2">
        <BsListTask className="me-2" />
        Bài tập
      </Nav.Link>
    
      
      <Nav.Link as={Link} to={"profileStudent"} className="d-flex align-items-center py-2">
        <BsGearFill className="me-2" />
        Cài đặt
      </Nav.Link>
    </Nav>
  );
}
export default Sidebar;
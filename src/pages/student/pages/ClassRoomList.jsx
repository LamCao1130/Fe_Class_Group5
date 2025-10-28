import { useState } from "react";
import { Container } from "react-bootstrap";
import ClassRoom from "./ClassRoom";

export default function ClassRoomList() {
  const [classRoom, setClassRoom] = useState([
    { id: 1, title: "Bài 1", teacherName: "Nguyễn Văn A" },
    { id: 2, title: "Bài 2", teacherName: "Nguyễn Văn A" },
    { id: 3, title: "Bài 2", teacherName: "Nguyễn Văn A" },
  ]);
  return (
    <Container className="d-flex justify-content-center align-items-center"
      style={{
        gap: "20px", 
        flexWrap: "nowrap", 
        height: "100%",
      }}>
 {classRoom.map((c) => (
  <ClassRoom
    key={c.id}
    title={c.title}
    teacherName={c.teacherName}
  />
))}
    </Container>
  );
}

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import teacherService from "../services/TeacherSerivceApi";
import { Row } from "react-bootstrap";

// Hàm chọn gradient ngẫu nhiên từ danh sách
function getRandomGradient() {
  const gradients = [
    "linear-gradient(to right, #4a00e0, #8e2de2)", // tím xanh
    "linear-gradient(to right, #ff512f, #dd2476)", // đỏ hồng
    "linear-gradient(to right, #00b09b, #96c93d)", // xanh lá
    "linear-gradient(to right, #2193b0, #6dd5ed)", // xanh dương nhạt
    "linear-gradient(to right, #f7971e, #ffd200)", // cam vàng
    "linear-gradient(to right, #834d9b, #d04ed6)", // tím hồng
    "linear-gradient(to right, #ff9966, #ff5e62)", // cam đỏ
    "linear-gradient(to right, #56ccf2, #2f80ed)", // xanh biển
  ];

  // Chọn ngẫu nhiên một gradient trong mảng
  return gradients[Math.floor(Math.random() * gradients.length)];
}

export default function HomePage() {
  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);
  const accountId = decoded.accountId;
  const gradient = useMemo(() => getRandomGradient(), []);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await teacherService.getListClassRoomByTeacherId(accountId);
      setData(res.data);
    }
    fetchData();
  }, []);
  return (
    <>
      <Row xs={1} sm={2} md={3} lg={3} className="g-4">
        {data?.map((item) => (
          <Card
            className="border-0 shadow-sm h-100"
            style={{
              borderRadius: "1rem",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
            }}
          >
            <div
              style={{
                height: "120px",
                borderTopLeftRadius: "1rem",
                borderTopRightRadius: "1rem",
                background: gradient,
              }}
            ></div>

            <Card.Body className="text-center">
              <Card.Title className="fw-bold text-dark mt-2">
                {item?.name}
              </Card.Title>
              <Card.Text className="text-muted small mb-3">
                👨 {item.teacherName || "Chưa có giáo viên"}
              </Card.Text>

              <Button
                variant="primary"
                className="px-4 rounded-pill"
                style={{
                  background: gradient,
                  border: "none",
                }}
                onClick={() => navigate(`/teacher/manageClass/${item.id}`)}
              >
                Vào lớp
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </>
  );
}

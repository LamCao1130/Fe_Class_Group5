import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router";
import { Card } from "react-bootstrap";
import "./App.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const [loginText, setLoginText] = useState({});
  const [registerText, setRegisterText] = useState({});
  const navigate = useNavigate();

  const loginAccount = async () => {
    try {
      let res = await axios.post("http://localhost:8080/api/login", loginText);
      console.log(res);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      let token = localStorage.getItem("accessToken");
      const decoded = jwtDecode(token);

      console.log(decoded);
      if (decoded.role === "TEACHER") {
        navigate("/teacher");
      } else if (decoded.role === "STUDENT") {
        navigate("/student/homepage");
      }
    } catch (e) {}
    setShowLogin(false);
  };

  return (
    <div className="login__all">
      <div>
        <h2>EngJoy tận hưởng việc học Tiếng Anh theo cách của bạn.</h2>
      </div>
      <Card style={{ width: "25rem" }}>
        <Card.Body>
          <div className="login">
            <input
              type="text"
              onChange={(e) => {
                setLoginText({ ...loginText, email: e.target.value });
              }}
              placeholder="Nhập email"
            />
            <input
              type="password"
              onChange={(e) => {
                setLoginText({ ...loginText, password: e.target.value });
              }}
              placeholder="Nhập mật khẩu"
            />
            <Button variant="primary" onClick={loginAccount}>
              Đăng nhập
            </Button>
            <Link style={{ alignItems: "center", textAlign: "center" }}>
              Quên mật khẩu
            </Link>
            <hr />
            <Button variant="success" onClick={handleShowLogin}>
              Tạo tài khoản mới
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Nhập thông tin đăng ký</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            onChange={(e) => {
              setRegisterText({ ...registerText, email: e.target.value });
            }}
            placeholder="Nhập email"
          />
          <input
            type="text"
            onChange={(e) => {
              setRegisterText({ ...registerText, fullName: e.target.value });
            }}
            placeholder="Nhập họ tên"
          />
          <input
            type="text"
            onChange={(e) => {
              setRegisterText({ ...registerText, email: e.target.value });
            }}
            placeholder="Nhập email"
          />
          <input
            type="text"
            onChange={(e) => {
              setRegisterText({ ...registerText, email: e.target.value });
            }}
            placeholder="Nhập email"
          />
          <input
            type="text"
            onChange={(e) => {
              setRegisterText({ ...registerText, email: e.target.value });
            }}
            placeholder="Nhập email"
          />
          <input
            type="text"
            onChange={(e) => {
              setRegisterText({ ...loginText, email: e.target.value });
            }}
            placeholder="Nhập email"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogin}>
            Hủy
          </Button>
          <Button variant="primary">Đăng nhập</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default App;

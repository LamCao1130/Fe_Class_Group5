import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router";
import { Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";

function App() {
  const [showRegister, setShowRegister] = useState(false);

  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);
  const [loginText, setLoginText] = useState({});
  const [registerText, setRegisterText] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    fullName: "",
    address: "",
    dateOfBirth: "",
  });
  const [logFail, setLogFail] = useState({});
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
    // setShowLogin(false);
  };

  const validation = () => {
    let c = 0;
    const errors = {};

    if (registerText.email.trim() === "") {
      errors.email = "Vui lòng nhập email";
      c++;
    }
    if (registerText.fullName.trim() === "") {
      errors.fullName = "Vui lòng nhập họ tên";
      c++;
    }

    if (registerText.fullName.trim() === "") {
      errors.fullName = "Vui lòng nhập họ tên";
      c++;
    }

    if (registerText.password.trim() === "") {
      errors.password = "Vui lòng nhập mật khẩu";
      c++;
    }

    if (registerText.confirmPassword.trim() === "") {
      errors.confirmPassword = "Vui lòng xác nhận mật khẩu";
      c++;
    }

    if (
      registerText.password &&
      registerText.confirmPassword &&
      registerText.password !== registerText.confirmPassword
    ) {
      errors.confirmPassword = "Mật khẩu không khớp";
      c++;
    }

    if (registerText.password?.length < 6) {
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      c++;
    }
    if (
      registerText.phoneNumber?.length < 10 ||
      registerText.phoneNumber?.length > 11
    ) {
      errors.phoneNumber = "Số điện thoại không hợp lệ";
      c++;
    }

    setLogFail(errors);
    return c === 0;
  };

  const registerAccount = async () => {
    let check = validation();
    console.log("logFail", logFail);
    if (!check) {
      return;
    }
    setLogFail({});
    try {
      let initialCreate = { ...registerText, roleId: 1 };
      let res = await axios.post(
        "http://localhost:8080/api/register",
        initialCreate
      );
      setRegisterText({
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        fullName: "",
        address: "",
        dateOfBirth: "",
      });
      console.log(res);
      toast.success("Đăng ký thành công");
      setShowRegister(false);
    } catch (e) {
      toast.error("Đăng ký thất bại");
    }
  };
  return (
    <div className="login__all">
      <ToastContainer position="top-right" autoClose={3000} />
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
            <Button variant="success" onClick={handleShowRegister}>
              Tạo tài khoản mới
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showRegister} onHide={handleCloseRegister}>
        <Modal.Header closeButton>
          <Modal.Title>Nhập thông tin đăng ký</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="register">
            <input
              type="text"
              onChange={(e) => {
                setRegisterText({ ...registerText, email: e.target.value });
              }}
              placeholder="Nhập email"
            />
            {logFail.email && (
              <span style={{ color: "red" }}>{logFail.email}</span>
            )}
            <input
              type="text"
              onChange={(e) => {
                setRegisterText({ ...registerText, fullName: e.target.value });
              }}
              placeholder="Nhập họ tên"
            />
            {logFail.fullName && (
              <span style={{ color: "red" }}>{logFail.fullName}</span>
            )}
            <input
              type="text"
              onChange={(e) => {
                setRegisterText({
                  ...registerText,
                  phoneNumber: e.target.value,
                });
              }}
              placeholder="Nhập số điện thoại"
            />
            {logFail.phoneNumber && (
              <span style={{ color: "red" }}>{logFail.phoneNumber}</span>
            )}
            {/* <input
            type="text"
            onChange={(e) => {
              setRegisterText({ ...registerText, email: e.target.value });
            }}
            placeholder="Nhập email"
          /> */}
            <input
              type="text"
              onChange={(e) => {
                setRegisterText({ ...registerText, address: e.target.value });
              }}
              placeholder="Nhập địa chỉ"
            />

            <input
              type="date"
              onChange={(e) => {
                setRegisterText({
                  ...registerText,
                  dateOfBirth: e.target.value,
                });
              }}
              placeholder="Nhập ngày sinh"
            />
            <input
              type="password"
              onChange={(e) => {
                setRegisterText({ ...registerText, password: e.target.value });
              }}
              placeholder="Nhập mật khẩu"
            />
            {logFail.password && (
              <span style={{ color: "red" }}>{logFail.password}</span>
            )}
            <input
              type="password"
              onChange={(e) => {
                setRegisterText({
                  ...registerText,
                  confirmPassword: e.target.value,
                });
              }}
              placeholder="Xác nhận mật khẩu"
            />
            {logFail.confirmPassword && (
              <span style={{ color: "red" }}>{logFail.confirmPassword}</span>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRegister}>
            Hủy
          </Button>
          <Button variant="primary" onClick={() => registerAccount()}>
            Đăng Ký
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default App;

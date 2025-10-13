import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const [loginText, setLoginText] = useState({});

  const loginAccount = async () => {
    try {
      let res = await axios.post("http://localhost:8080/api/login", loginText);
      console.log(res);
    } catch (e) {}
    setShowLogin(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShowLogin}>
        Đăng nhập
      </Button>

      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Nhập thông tin đăng nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogin}>
            Hủy
          </Button>
          <Button variant="primary" onClick={loginAccount}>
            Đăng nhập
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default App;

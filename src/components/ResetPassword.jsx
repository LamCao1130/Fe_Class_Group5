import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axiosApi from "./AxiosApi";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  let navigate = useNavigate();
  return (
    <Container>
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="my-4 text-center">Đặt lại mật khẩu</h2>
      <Button
        variant="success"
        onClick={() => {
          navigate("/");
        }}
      >
        Trở về
      </Button>
      <br />
      <br />
      <input
        type="text"
        style={{
          outline: "none",
          padding: "15px",
          border: "1px solid gray",
          borderRadius: "15px",
          width: "100%",
        }}
        placeholder="Nhập email của bạn"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <Button
        onClick={async () => {
          try {
            await axiosApi.post(
              "http://localhost:8080/api/v1/public/reset-password",
              { email: email }
            );
            toast.success("Mã đặt lại mật khẩu đã được gửi đến email của bạn.");
          } catch (e) {
            toast.error("Gửi mã thất bại. Vui lòng kiểm tra lại email.");
          }
        }}
      >
        Xác nhận
      </Button>
    </Container>
  );
}

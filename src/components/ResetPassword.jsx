import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axiosApi from "./AxiosApi";
import { ToastContainer, toast } from "react-toastify";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  return (
    <Container>
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="my-4 text-center">Đặt lại mật khẩu</h2>
      <input
        type="text"
        style={{
          outline: "none",
          padding: "15px",
          border: "1px solid gray",
          borderRadius: "15px",
        }}
        placeholder="Nhập email của bạn"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <Button
        onClick={async () => {
          try {
            await axiosApi.post("/auth/reset-password", { email: email });
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

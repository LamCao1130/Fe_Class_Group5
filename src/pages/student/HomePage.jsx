import React from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
// Giả sử đường dẫn import này là chính xác
import BackgroundImage from "../../image/bg_image_studenthomepage.jpg";

export default function HomePage() {
  return (
    <Container
      fluid
      style={{
        backgroundImage: `linear-gradient(rgba(40, 120, 235, 0.9), rgba(40, 120, 235, 0.9)), url(${BackgroundImage})`,
        backgroundColor: "blue",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "90vh",
        backgroundPosition: "center",
      }}
    >
      <div className=" text-center text-light" style={{ paddingTop: "20vh" }}>
        <h1>Learn From Home</h1>
        <h1 style={{ fontSize: "8vw" }}>Education Courses</h1>
        <InputGroup className="mb-3 w-50 m-auto">
          <InputGroup.Text>Classroom</InputGroup.Text>
          <Form.Control placeholder="Key word" aria-label="Last name" />
          <Button
            as="input"
            type="submit"
            className="bg-danger px-5"
            value="Search"
          />
        </InputGroup>
      </div>
    </Container>
  );
}

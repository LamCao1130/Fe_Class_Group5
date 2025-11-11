import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CreateStudent = ({
  show,
  handleClose,
  newStudent,
  handleInputChange,
  handleSubmit,
}) => {
  const [errors, setErrors] = useState({});

  // ✅ Hàm kiểm tra dữ liệu
  const validateForm = () => {
    const newErrors = {};

    if (!newStudent.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!newStudent.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newStudent.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (newStudent.phoneNumber && !/^(0|\+84)\d{9,10}$/.test(newStudent.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format.";
    }

    if (!newStudent.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (newStudent.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (!newStudent.address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!newStudent.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required.";
    } else {
      const dob = new Date(newStudent.dateOfBirth);
      const today = new Date();
      if (dob >= today) {
        newErrors.dateOfBirth = "Date of birth must be before today.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (validateForm()) {
      handleSubmit();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Student</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>

          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={newStudent.fullName}
              onChange={handleInputChange}
              isInvalid={!!errors.fullName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fullName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={newStudent.email}
              onChange={handleInputChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={newStudent.phoneNumber}
              onChange={handleInputChange}
              isInvalid={!!errors.phoneNumber}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phoneNumber}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={newStudent.password}
              onChange={handleInputChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={newStudent.address}
              onChange={handleInputChange}
              isInvalid={!!errors.address}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={newStudent.dateOfBirth}
              onChange={handleInputChange}
              isInvalid={!!errors.dateOfBirth}
            />
            <Form.Control.Feedback type="invalid">
              {errors.dateOfBirth}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateStudent;

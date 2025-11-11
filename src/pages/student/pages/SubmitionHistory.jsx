import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Badge,
  Card,
  Button,
  Form,
  Navbar,
  Nav,
} from "react-bootstrap";
import studentApi from "../studentApi/studentApi";
import { useParams } from "react-router";

const getTypeInfo = (type) => {
  switch (type.toLowerCase()) {
    case "vocab":
      return { label: "Từ Vựng", variant: "info" };
    case "writing":
      return { label: "Viết", variant: "warning" };
    case "listening":
      return { label: "Nghe", variant: "success" };
    case "reading":
      return { label: "Đọc", variant: "primary" };
    default:
      return { label: "Khác", variant: "secondary" };
  }
};

const SubmissionHistory = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fakeSubmission, setFakeSubmission] = useState();
  const { id } = useParams();
  const [filterType, setFilterType] = useState("All");
  const [activeTab, setActiveTab] = useState("All");
  const [searchKeyword, setSearchKeyword] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const res = await studentApi.getListSubmitionHistoryByLesson(id);
      setSubmissions(res);
      setFakeSubmission(res);
      console.log(res);
    };
    setLoading(false);
    fetchData();
  }, []);

  const handleChange = (key, value) => {
    if (key == "Status") {
      setActiveTab(value);
      setSubmissions(
        fakeSubmission.filter(
          (item) =>
            (filterType != "All" ? item.type == filterType : true) &&
            (value != "All" ? item.status == value : true)
        )
      );
    } else if (key == "type") {
      setFilterType(value);
      setSubmissions(
        fakeSubmission.filter(
          (item) =>
            (value != "All" ? item.type == value : true) &&
            (activeTab != "All" ? item.status == activeTab : true)
        )
      );
    }
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return "N/A";
    try {
      const date = new Date(isoString);

      const time = date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const dateOnly = date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      return `${time} ${dateOnly}`;
    } catch (e) {
      console.error("Lỗi định dạng ngày:", e);
      return "Ngày không hợp lệ";
    }
  };

  const handleSearch = (e) => {
    if (e == "Enter") {
      setSubmissions(
        fakeSubmission.filter((item) =>
          item.studentName.toLowerCase().includes(searchKeyword.toLowerCase())
        )
      );
    }
  };

  const renderNumberWrong = (type, numberWrong) => {
    const isGradedType = ["vocab", "writing", "reading"].includes(
      type.toLowerCase()
    );

    if (isGradedType && numberWrong !== null) {
      if (numberWrong > 0) {
        return <span className="text-danger"> {numberWrong} lỗi</span>;
      }
      return <span className="text-success"> Hoàn hảo (0 lỗi)</span>;
    }

    return <span className="text-muted">N/A</span>;
  };

  if (loading) {
    return (
      <Container className="mt-4">
        <p>Đang tải lịch sử nộp bài...</p>
      </Container>
    );
  }

  if (submissions.length === 0) {
    return (
      <Container className="mt-4">
        <p>Không có lịch sử nộp bài nào.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4"> Lịch Sử Nộp Bài</h1>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand className="fw-bold"></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link
              onClick={(e) => {
                handleChange("Status", "All");
              }}
              active={activeTab === "All"}
              className="fw-medium"
            >
              All
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                handleChange("Status", "Done");
              }}
              active={activeTab === "Done"}
              className="fw-medium"
            >
              Done
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                handleChange("Status", "Late");
              }}
              active={activeTab === "Late"}
              className="fw-medium"
            >
              Late
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                handleChange("Status", "Missing");
              }}
              active={activeTab === "Missing"}
              className="fw-medium"
            >
              Missing
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>{" "}
      </Navbar>
      <Card className="mt-3">
        <div className="d-flex justify-content-between mt-3 mx-3">
          <Form.Select
            style={{ width: "20%" }}
            value={filterType}
            onChange={(e) => {
              handleChange("type", e.target.value);
            }}
          >
            <option value="All">Tất Cả Các Loại</option>
            <option key={"vocab"} value={"vocab"}>
              Vocabulary
            </option>
            <option key={"Listening"} value={"listening"}>
              Listening
            </option>
            <option key={"Writing"} value={"writing"}>
              Writing
            </option>
            <option key={"reading"} value={"reading"}>
              Reading
            </option>
          </Form.Select>{" "}
          <Form.Control
            placeholder="Tìm kiếm học sinh..."
            onKeyDown={(e) => handleSearch(e.key)}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="background-primary"
            style={{ width: "20%" }}
            type="text"
          ></Form.Control>
        </div>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#STT</th>
                <th>Name</th>
                <th>Loại Bài Tập</th>
                <th>Thời Gian Nộp</th>
                <th>Kết Quả (Số Lỗi)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((item, index) => {
                const typeInfo = getTypeInfo(item.type);
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <th>{item.studentName}</th>
                    <td>
                      <Badge bg={typeInfo.variant}>{typeInfo.label}</Badge>
                    </td>
                    <td>{formatDateTime(item.submittedAt)}</td>
                    <td>{renderNumberWrong(item.type, item.numberWrong)}</td>
                    <td>
                      <span
                        className={
                          item.status === "Done"
                            ? "text-success"
                            : item.status === "Late"
                            ? "text-warning"
                            : "text-danger"
                        }
                        size="sm"
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SubmissionHistory;

import React, { useState, useEffect } from "react";
import { Container, Table, Badge, Card, Button, Form } from "react-bootstrap";
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
  const { lessionId } = useParams();
  const [filterType, setFilterType] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await studentApi.getListSubmitionHistoryByLesson(lessionId);
      setSubmissions(res);
      setFakeSubmission(res);
    };
    setLoading(false);
    fetchData();
  }, []);

  const handleChange = (value) => {
    setFilterType(value);
    if (value != "all")
      setSubmissions(fakeSubmission.filter((item) => item.type == value));
    else {
      setSubmissions(fakeSubmission);
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
      <Card>
        <div className="d-flex justify-content-between">
          <Card.Header as="h3"> Lịch Sử Nộp Bài</Card.Header>
          <Form.Select
            style={{ width: "20%" }}
            value={filterType}
            onChange={(e) => handleChange(e.target.value)}
          >
            <option value="all">Tất Cả Các Loại</option>
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
        </div>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#STT</th>
                <th>Loại Bài Tập</th>
                <th>Thời Gian Nộp</th>
                <th>Kết Quả (Số Lỗi)</th>
                <th>Chi Tiết</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((item, index) => {
                const typeInfo = getTypeInfo(item.type);
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      <Badge bg={typeInfo.variant}>{typeInfo.label}</Badge>
                    </td>
                    <td>{formatDateTime(item.submittedAt)}</td>
                    <td>{renderNumberWrong(item.type, item.numberWrong)}</td>
                    <td>
                      <Button variant="outline-info" size="sm">
                        Xem
                      </Button>
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

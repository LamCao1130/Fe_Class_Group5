import React from "react";
import { Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import style from "../../../css/ClassDetail.module.css";
import { useState } from "react";

const ClassDetail = () => {
  const [zoom, setZoom] = useState(false);
  console.log(zoom);

  return (
    <div>
      <Container className="margin-auto" style={{ width: "60vw" }}>
        <Card
          className=" bg-danger d-flex justify-content-end"
          style={{ height: "30vh" }}
        >
          <div className="ps-3 mb-2 text-light">
            <strong>SE1880-JV_SBA301</strong>
            <br />
            Fullstack Java ReactJS + Spring Boot
          </div>
        </Card>
        <Row>
          <Col lg="3" className="mt-3">
            <Card>
              <div className="d-flex justify-content-between pt-3 px-3">
                <span>
                  <strong>Mã lớp</strong>
                </span>
                <span>
                  <i className="bi bi-three-dots-vertical"></i>
                </span>
              </div>
              <div className="my-3 ps-3 text-primary fs-5 d-flex justify-content-around">
                <span>54ufkmm4</span>{" "}
                <i
                  className={`bi bi-zoom-in ${style.zoom}`}
                  onClick={() => setZoom(!zoom)}
                ></i>
              </div>
            </Card>
            <Card className="mt-3 px-3">
              <div className="py-3">
                <strong>Sắp đến hạn</strong>
              </div>
              <span>Không có bài tập nào sắp đến hạn</span>
              <div className="my-3 text-primary text-end">Xem tất cả</div>
            </Card>
          </Col>
          <Col>
            <Card className="mt-3 p-3">
              <Form className="mt-3 ms-3 ">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  {/* Nhãn cho Textarea */}
                  <Form.Label>Nội dung thông báo</Form.Label>

                  <Form.Control
                    // Bắt buộc phải thêm thuộc tính này để biến nó thành Textarea
                    as="textarea"
                    // Thiết lập số lượng dòng hiển thị mặc định (ví dụ: 3 dòng)
                    rows={3}
                    // Thêm placeholder
                    placeholder="Nhập nội dung của bạn tại đây..."
                  />
                </Form.Group>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ClassDetail;

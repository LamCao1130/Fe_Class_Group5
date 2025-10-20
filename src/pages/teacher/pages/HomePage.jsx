import React from "react";
import { Card, Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import styles from "../../../css/Card.module.css";
import ReusableTooltip from "../components/ReusableTooltip";
const HomePage = () => {
  return (
    <div>
      <Card className={`${styles.card}`}>
        <Card.Header>
          <Card.Title>SE1880-JV_SBA301</Card.Title>
          <Card.Subtitle className="mb-2 text-muted ">
            Fullstack Java ReactJS + Spring Boot
          </Card.Subtitle>
          <Card.Text>Nguyễn Thị Điệu(FE FPT HN)</Card.Text>
        </Card.Header>
        <Card.Body>
          <strong>Đến hạn thứ Năm</strong>
          <Card.Text>23:59 - Assignment 02</Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-end fs-4">
          <ReusableTooltip
            tooltipText="Thông tin chi tiết hồ sơ"
            placement="bottom"
          >
            <i className="bi bi-file-earmark-person"></i>
          </ReusableTooltip>
          <i className="bi bi-file-earmark"></i>
          <Dropdown align="end">
            <Dropdown.Toggle as="div" id="dropdown-plus">
              <ReusableTooltip tooltipText="Thông tin thêm" placement="bottom">
                <i className="bi bi-three-dots-vertical"></i>
              </ReusableTooltip>
            </Dropdown.Toggle>
            <Dropdown.Menu className="m-4">
              <Dropdown.Item>Di chuyển </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="text-danger">Hủy đăng kí</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default HomePage;

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
export default function ClassRoom({ id,title, teacherName }) {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {teacherName}
          </Card.Text>
          <Button variant="primary">Vào Lớp</Button>
        </Card.Body>
      </Card>
    </>
  );
}
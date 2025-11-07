import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useParams } from "react-router";

export default function ExerciseNavBar() {
  const { lessonId } = useParams();

  return (
    <div>
      <Nav onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}>
        <Nav.Item>
          <Nav.Link as={Link} to={`/student/doExercise/${lessonId}/mcAndFill`}>
            Vocabulary
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={`/student/doExercise/${lessonId}/reading`}>
            Reading
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={`/student/doExercise/${lessonId}/writting`}>
            Writting
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={`/student/doExercise/${lessonId}/listening`}>
            Listening
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

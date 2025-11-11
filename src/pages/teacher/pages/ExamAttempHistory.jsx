import React, { useEffect, useState } from "react";
import teacherService from "../services/TeacherSerivceApi";
import { useParams } from "react-router";
import { Card, Table } from "react-bootstrap";

const ExamAttempHistory = () => {
  const [history, setHistory] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const res = await teacherService.getExamAttemptByClassroom(id);
      setHistory(res);
    };
    fetchData();
  }, [id]);
  console.log(history);
  return (
    <Card className="p-4 shadow-sm">
      <h5>Assignments & Tests</h5>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Test</th>
            <th>Time Spent</th>
            <th>Started At</th>
            <th>Submitted At</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {history?.map((h, index) => (
            <tr key={h.id}>
              <td>{index + 1}</td>
              <td>{h.email}</td>
              <td>{h.examTitle}</td>
              <td>{h.timeSpent} phút</td>
              <td>{new Date(h.startedAt).toLocaleString()}</td>
              <td>{new Date(h.submittedAt).toLocaleString()}</td>
              <td>{h.score}</td>
            </tr>
          ))}
          {history?.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center text-muted">
                No history found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Card>
  );
};

export default ExamAttempHistory;

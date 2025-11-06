import React, { useEffect, useState } from "react";
import { Table, Card } from "react-bootstrap";
import axiosApi from "../../../components/AxiosApi";

const ExamHistory = ({ studentId }) => {
  const [history, setHistory] = useState([]);
  const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axiosApi.get(
          `http://localhost:8080/api/admin/student/${studentId}/examHistory`
        );
        const data = response.data;
        console.log("Fetched history data:", data.content);

        const content = data.content || [];
        setHistory(content);

        if (content.length > 0) {
          const avg =
            content.reduce((sum, item) => sum + item.score, 0) /
            content.length;
          setAverageScore(avg.toFixed(2));
        } else {
          setAverageScore(0);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    if (studentId) {
      fetchHistory();
    }
  }, [studentId]);

  return (
    <Card className="p-4 shadow-sm">
      <h5>Assignments & Tests</h5>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Test</th>
            <th>Time Spent</th>
            <th>Started At</th>
            <th>Submitted At</th>
            <th>Status</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h, index) => (
            <tr key={h.id}>
              <td>{index + 1}</td>
              <td>{h.examTitle}</td>
              <td>{h.timeSpent} phút</td>
              <td>{new Date(h.startedAt).toLocaleString()}</td>
              <td>{new Date(h.submittedAt).toLocaleString()}</td>
              <td>{h.status}</td>
              <td>{h.score}</td>
            </tr>
          ))}
          {history.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center text-muted">
                No history found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <h6 className="mt-3 text-end">
        Average Score: <strong>{averageScore}</strong>
      </h6>
    </Card>
  );
};

export default ExamHistory;

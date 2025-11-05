import React, { useEffect, useState } from "react";
import { Table, Card, Pagination } from "react-bootstrap";
import axiosApi from "../../../components/AxiosApi";

const AssignmentHistory = ({ studentId }) => {
  const [assignments, setAssignments] = useState([]);
  const [averageScore, setAverageScore] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(5); // số bản ghi mỗi trang

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axiosApi.get(
          `http://localhost:8080/api/admin/student/${studentId}/assignmentHistory?page=${page}&size=${pageSize}`
        );
        const data = response.data;
        console.log("Fetched assignment history:", data);

        setAssignments(data.content || []);
        setTotalPages(data.totalPages);

        if (data.content?.length > 0) {
          const scored = data.content.filter(item => item.score !== null);
          const avg = scored.reduce((sum, a) => sum + a.score, 0) / (scored.length || 1);
          setAverageScore(avg.toFixed(2));
        } else {
          setAverageScore(0);
        }
      } catch (error) {
        console.error("Error fetching assignment history:", error);
      }
    };

    fetchAssignments();
  }, [studentId, page, pageSize]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) setPage(newPage);
  };

  return (
    <Card className="p-4 shadow-sm">
      <h5>Assignment History</h5>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Lesson</th>
            <th>Deadline</th>
            <th>Submitted At</th>
            <th>Time Spent</th>
            <th>Status</th>
            <th>Score</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a, index) => (
            <tr key={a.submissionId}>
              <td>{page * pageSize + index + 1}</td>
              <td>{a.lessonName}</td>
              <td>{a.deadline ? new Date(a.deadline).toLocaleString() : "—"}</td>
              <td>{a.submittedAt ? new Date(a.submittedAt).toLocaleString() : "—"}</td>
              <td>{a.timeSpent ? `${a.timeSpent} phút` : "—"}</td>
              <td>{a.status ?? "—"}</td>
              <td>{a.score ?? "—"}</td>
              <td>{a.teacherFeedback ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h6 className="mt-3">
            Average Score: <strong>{averageScore}</strong>
          </h6>
        </div>

        {/* Pagination */}
        <Pagination className="m-0">
          <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 0} />
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item key={i} active={i === page} onClick={() => handlePageChange(i)}>
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page + 1 >= totalPages} />
        </Pagination>
      </div>
    </Card>
  );
};

export default AssignmentHistory;

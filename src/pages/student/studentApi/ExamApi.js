const BASE_URL = "http://localhost:8080";
export const getExamClassRoomId = async (classRoomId) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(
      `${BASE_URL}/api/v1/exam/get-by-classRoomId/${classRoomId}`,  
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data =await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

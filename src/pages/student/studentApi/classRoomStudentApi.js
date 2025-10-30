const BASE_URL="http://localhost:8080";

export const getClassRoomStudentApi = async (page = 0, size = 10) => { 
    try{
        const token = localStorage.getItem("accessToken");
        const url = new URL(`${BASE_URL}/api/v1/class-rooms-student/student/classroom`);
        url.searchParams.append('page', page);
        url.searchParams.append('size', size);
        console.log(token)
        const response = await fetch(url.toString(), {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
        }

        const data = await response.json();
        return data;
    }catch(error){
        console.error("Error fetching data:", error); // Ghi lại lỗi
        throw error;
    }
}
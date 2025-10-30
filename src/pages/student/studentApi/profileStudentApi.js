const BASE_URL="http://localhost:8080";

export const getProfileApi= async ()=>{
    try{
        const token = localStorage.getItem("accessToken");
        const response = await fetch(`${BASE_URL}/api/profileStudent`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`,
            },
        });
        const data = await response.json();
        return data;
    }catch(error){
        throw error;
    }
}
export const updateProfileApi = async (updateProfile) =>{
    try{
        const token = localStorage.getItem("accessToken");
        const response = await fetch(`${BASE_URL}/api/profileStudent`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`,
            },
              body: JSON.stringify(updateProfile),
        });
        const data = await response.json();
        return data;
    }catch(error){
        throw error;
    }
}
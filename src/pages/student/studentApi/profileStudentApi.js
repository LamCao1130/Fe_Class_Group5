const BASE_URL = "http://localhost:8080";

export const getProfileApi = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${BASE_URL}/api/profileStudent`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export const updateProfileApi = async (updateProfile) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${BASE_URL}/api/profileStudent`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateProfile),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export const changePasswordApi = async (passwordData) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${BASE_URL}/api/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(passwordData),
    });
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || "Đổi mật khẩu thất bại");
    }

    return await response.text();
  } catch (error) {
    throw error;
  }
};

const baseUrl = "http://localhost:8080";

const checkResponse = async (res: Response) => {
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      return data;
    }
    const errorMessage = data.error || `Error: ${res.status}`;
    return Promise.reject(new Error(errorMessage));
  };

const request = (url: string, options: RequestInit) => {
    return fetch(url, options).then(checkResponse);
  };


  export const login = async (username: string, password: string) => {
    const response = await request(`${baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.token) {
      return response.token;
    }
  
    throw new Error(response.error || "Unknown login error");
  };

  export const getLocations = async (token: string) => {
    const response = await request (`${baseUrl}/location`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
        },
    });
    if (!response.ok) {
        throw new Error("Authentication token required");
      }

      return await response.json();
}
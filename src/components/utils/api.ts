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
const baseUrl = "http://localhost:8080";

// Check response and return JSON if successful, otherwise throw an error
const checkResponse = async (res: Response) => {
  const data = await res.json().catch(() => ({}));
  if (res.ok) {
    return data;
  }
  const errorMessage = data.error || `Error: ${res.status}`;
  return Promise.reject(new Error(errorMessage));
};

// Helper function to make requests to the backend
const request = (url: string, options: RequestInit) => {
  return fetch(url, options).then(checkResponse);
};

// LOGIN: Authenticate and get JWT token
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

// GET LOCATIONS: Fetch a list of locations
export const getLocations = async (token: string) => {
  const response = await request(`${baseUrl}/location`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

// GET MESSAGE STREAMS: Fetch chat message streams
export const getMessageStreams = async (token: string, locationId?: string) => {
  const url = locationId
    ? `${baseUrl}/message-stream?locationId=${locationId}`
    : `${baseUrl}/message-stream`;

  const response = await request(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

// GET SINGLE MESSAGE STREAM: Fetch a single message stream by ID
export const getSingleMessageStream = async (
  token: string,
  streamId: string
) => {
  const response = await request(`${baseUrl}/message-stream/${streamId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

// MARK AS READ: Mark all messages in the stream as read
export const markStreamAsRead = async (token: string, streamId: string) => {
  const response = await request(`${baseUrl}/message-stream/${streamId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.success;
};

// SEND MESSAGE: Send a new message to a stream
export const sendMessage = async (
  token: string,
  streamId: string,
  content: string
) => {
  if (!content) {
    throw new Error("Message content is required");
  }

  const response = await request(`${baseUrl}/message/${streamId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  return response.success;
};

// mock forgot password functionality
export const forgotPassword = async (email: string) => {
  if (import.meta.env.DEV) {
    // simulate network delay
    await new Promise((res) => setTimeout(res, 500));
    // return true
    return { success: true };
  }

  // example for when backend is ready
  const response = await request(`${baseUrl}/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (response.success) {
    return response;
  }
  throw new Error(response.error || "Failed to send reset link");
};

export default {
  login,
  getLocations,
  getMessageStreams,
  getSingleMessageStream,
  markStreamAsRead,
  sendMessage,
  forgotPassword,
};

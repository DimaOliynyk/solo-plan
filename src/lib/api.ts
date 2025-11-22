export interface User {
  id: string;
  username: string;
  email: string;
  // add other fields returned by your API
}

export const getUser = async (): Promise<User> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await fetch('http://192.168.0.90:3001/api/auth/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`);
  }

  return response.json();
};


export interface User {
  _id: string;
  username: string;
  email?: string;
  avatarUrl?: string;
  googleId?: string;
  tasks?: object[];
  createdAt: string;
  updatedAt: string;
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


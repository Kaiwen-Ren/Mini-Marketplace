import React, { createContext, useContext, useEffect, useState } from "react";
import { User, UserId } from "./types";
import { apiGet } from "./api"; // 你已经写好的封装 GET 的函数

interface UserContextValue {
  users: User[];
  currentUserId: UserId;
  currentUser: User | null;
  setCurrentUserId: (id: UserId) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUserId, setCurrentUserId] = useState<UserId>("alice");

  useEffect(() => {
    // 从后端拉用户 + 头像
    const loadUsers = async () => {
      try {
        const data: User[] = await apiGet("/api/users");
        setUsers(data);

        // 如果后端有别的默认逻辑，也可以根据 data[0] 设置默认 currentUserId
        if (data.length > 0 && !data.find(u => u.id === currentUserId)) {
          setCurrentUserId(data[0].id);
        }
      } catch (err) {
        console.error("Failed to load users", err);
      }
    };
    loadUsers();
  }, []);

  const currentUser = users.find((u) => u.id === currentUserId) || null;

  return (
    <UserContext.Provider
      value={{
        users,
        currentUserId,
        currentUser,
        setCurrentUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextValue => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};

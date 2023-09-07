// NotificationContext.tsx
import React, { createContext, useContext, useState } from "react";

export enum NotificationType {
  ERROR = "error",
  WARNING = "warning",
  SUCCESS = "success",
}

export interface NotificationData {
  type: NotificationType;
  message: string;
}

interface NotificationContextValue {
  notifications: NotificationData[];
  addNotification: (notification: NotificationData) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined,
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};

export const NotificationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const addNotification = (notification: NotificationData) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const contextValue: NotificationContextValue = {
    notifications,
    addNotification,
    clearNotifications,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

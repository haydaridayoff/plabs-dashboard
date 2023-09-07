// NotificationDisplay.tsx
import React from "react";
import { useNotification } from "../../contexts/NotificationContext";
import NotificationPortal from "./NotificationPortal";

const NotificationDisplay: React.FC = () => {
  const { notifications, clearNotifications } = useNotification();

  return (
    <NotificationPortal>
      <div className="notification-display fixed top-4 right-4 z-50">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className={`notification px-4 py-2 mb-2 cursor-pointer rounded ${
              notification.type === "error"
                ? "bg-red-500 text-white"
                : notification.type === "warning"
                ? "bg-yellow-400 text-gray-800"
                : "bg-green-500 text-white"
            }`}
            onClick={() => clearNotifications()}
          >
            {notification.message}
          </div>
        ))}
      </div>
    </NotificationPortal>
  );
};

export default NotificationDisplay;

// NotificationPortal.tsx
import React from "react";
import ReactDOM from "react-dom";

const NotificationPortal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const portalRoot = document.getElementById(
    "notification-root",
  ) as HTMLElement;

  return ReactDOM.createPortal(children, portalRoot);
};

export default NotificationPortal;

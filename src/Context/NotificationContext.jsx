import React from "react";
import { createContext, useContext, useState } from "react";
import { ErrorPopup } from "../utils/ErrorPopup";

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [popup, setPopup] = useState({ 
    show: false, 
    message: "", 
    variant: "error" 
  });

  const showNotification = (message, variant = "error") => {
    if (!message) return;
    setPopup({ show: true, message, variant });
  };

  const hidePopup = () => {
    setPopup({ show: false, message: "", variant: "error" });
  };

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        showError: (msg) => showNotification(msg, "error"),
        showSuccess: (msg) => showNotification(msg, "success"),
      }}
    >
      {children}
      {popup.show && (
        <ErrorPopup 
          takeData={popup.message} 
          setPopupShow={hidePopup}
          variant={popup.variant}
        />
      )}
    </NotificationContext.Provider>
  );
};
import { useState } from "react";
import { LoginPage } from "@/components/auth/LoginPage";
import { WorkshopRegistration } from "@/components/workshop/WorkshopRegistration";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleRegistrationSuccess = () => {
    setIsRegistrationComplete(true);
    // Reset to login for demo purposes or redirect to success page
    setTimeout(() => {
      setIsLoggedIn(false);
      setIsRegistrationComplete(false);
    }, 3000);
  };

  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return <WorkshopRegistration onRegistrationSuccess={handleRegistrationSuccess} />;
};

export default Index;

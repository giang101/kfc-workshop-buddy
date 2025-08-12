import { useState } from "react";
import { LoginPage } from "@/components/auth/LoginPage";
import { WorkshopRegistration } from "@/components/workshop/WorkshopRegistration";
import { SlotAvailability } from "@/components/workshop/SlotAvailability";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'registration' | 'slots' | 'complete'>('welcome');
  const [registrationData, setRegistrationData] = useState({
    selectedDate: '',
    selectedTime: ''
  });

  const handleLoginSuccess = () => {
    setCurrentStep('registration');
  };

  const handleRegistrationData = (data: any) => {
    setRegistrationData({
      selectedDate: data.preferredDate,
      selectedTime: data.preferredTime
    });
    setCurrentStep('slots');
  };

  const handleSlotContinue = () => {
    setCurrentStep('complete');
    // Reset to welcome for demo purposes
    setTimeout(() => {
      setCurrentStep('welcome');
    }, 3000);
  };

  const handleSlotBack = () => {
    setCurrentStep('registration');
  };

  if (currentStep === 'welcome') {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  if (currentStep === 'slots') {
    return (
      <SlotAvailability 
        onContinue={handleSlotContinue}
        onBack={handleSlotBack}
        selectedDate={registrationData.selectedDate}
        selectedTime={registrationData.selectedTime}
      />
    );
  }

  return <WorkshopRegistration onRegistrationSuccess={handleRegistrationData} />;
};

export default Index;

'use client';

import React, { createContext, useContext, useState } from 'react';
import ConsultationModal from '@/components/ConsultationModal';

interface ConsultationContextType {
  openModal: (serviceTitle?: string) => void;
  closeModal: () => void;
}

const ConsultationContext = createContext<ConsultationContextType>({
  openModal: () => {},
  closeModal: () => {},
});

export function ConsultationProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const openModal = (serviceTitle?: string) => {
    setSelectedService(serviceTitle);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ConsultationContext.Provider value={{ openModal, closeModal }}>
      {children}
      <ConsultationModal
        isOpen={isOpen}
        onClose={closeModal}
        serviceTitle={selectedService}
      />
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  return useContext(ConsultationContext);
}

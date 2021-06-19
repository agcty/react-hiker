import React from "react";

export const HikerContext = React.createContext<{
  activeStep: string;
  setActiveStep: (newActiveStep: string) => void;
  next: () => void;
  goTo: (id: string) => void;
  back: () => void;
  isLast: boolean;
  length: number;
  activeIndex: number;
}>(null);

export function useHikerContext() {
  return React.useContext(HikerContext);
}

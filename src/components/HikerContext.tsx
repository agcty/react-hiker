import React from "react";

interface HikerContextProps {
  activeStep: string;
  setActiveStep: (newActiveStep: string) => void;
  next: () => void;
  goTo: (id: string) => void;
  back: () => void;
  isLast: boolean;
  length: number;
  activeIndex: number;
}

export const HikerContext = React.createContext<HikerContextProps>({
  activeStep: "",
  setActiveStep: () => "",
  next: () => null,
  goTo: () => null,
  back: () => null,
  isLast: false,
  length: 0,
  activeIndex: 0,
});

export function useHikerContext() {
  return React.useContext(HikerContext);
}

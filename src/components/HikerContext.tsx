import React from "react";

interface HikerContextProps {
  activeStep: string;
  next: () => void;
  goTo: (id: string) => void;
  back: () => void;
  isLast: boolean;
  length: number;
  activeIndex: number;
}

export const HikerContext = React.createContext<HikerContextProps>({
  activeStep: "",
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

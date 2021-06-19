import React from "react";

export const WalkthroughContext = React.createContext<{
  activeStep: number;
  setActiveStep: (newActiveStep: number) => void;
  next: () => void;
  goTo: (id: string | number) => void;
  back: () => void;
  isLast: boolean;
  length: number;
  activeIndex: number;
}>(null);

export function useWalkthrough() {
  return React.useContext(WalkthroughContext);
}

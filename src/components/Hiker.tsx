import React, { useState } from "react";

import { HikerContext, useHikerContext } from "./HikerContext";

interface HikerProps {
  children: React.ReactNode;
  initial?: string;
}

function Hiker({ children, initial }: HikerProps) {
  // get all ids of child Hiker.Step components and create a list
  // we need that for making next() and back() possible
  const idList: string[] = React.Children.toArray(children)
    .flat()
    .filter((c) => (c as any).props?.id)
    .map((comps) => (comps as any).props.id);

  if (checkForDuplicates(idList)) {
    console.error(
      "Warning! Your Hiker has duplicate ids which results in unexpected behaviour!"
    );
  }

  const getInitialStep = () => {
    // if initial exists in idList use that as the activeStep
    if (initial && idList.includes(initial as string)) {
      return initial;
    }

    // else return the first id of the list
    return idList[0];
  };

  const [activeStep, setLocalActiveStep] = useState<string>(getInitialStep());

  const activeIndex = idList.indexOf(activeStep);

  const isLast = idList.indexOf(activeStep) === idList.length - 1;

  const { length } = idList;

  const next = () => {
    // canot go further than the last element
    if (activeIndex === idList.length - 1) {
      return;
    }

    setLocalActiveStep((old) => idList[idList.indexOf(old) + 1]);
  };

  const goTo = (id: string) => {
    if (idList.includes(id)) {
      setLocalActiveStep(idList[idList.indexOf(id)]);
    } else {
      console.warn(
        `Step id ${id} not found in idList, check that all of your ids are correct!`
      );
    }
  };

  const back = () => {
    // cannot go back more than the first index
    if (activeIndex === 0) {
      return;
    }

    setLocalActiveStep((old) => idList[idList.indexOf(old) - 1]);
  };

  return (
    <HikerContext.Provider
      value={{
        next,
        activeStep,
        back,
        goTo,
        isLast,
        length,
        activeIndex,
      }}
    >
      {children}
    </HikerContext.Provider>
  );
}

interface HikerStepProps {
  id: string;
  children: React.ReactNode;
}

Hiker.Step = function HikerStep({ id, children }: HikerStepProps) {
  const { activeStep } = useHikerContext();

  if (activeStep === id) {
    return <>{children}</>;
  }

  return <></>;
};

interface NextButtonProps {
  children: ({
    next,
    goTo,
    isLast,
    back,
  }: {
    next: () => void;
    goTo: (id: string) => void;
    back: () => void;
    isLast: boolean;
  }) => React.ReactNode;
}

Hiker.Button = function NextButton({ children }: NextButtonProps) {
  const { next, goTo, isLast, back } = useHikerContext();

  return <>{children({ next, goTo, isLast, back })}</>;
};

function checkForDuplicates(array: Array<string | number>) {
  return new Set(array).size !== array.length;
}

export default Hiker;

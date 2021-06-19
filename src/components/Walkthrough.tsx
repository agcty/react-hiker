import React, { useState } from "react";

import { useWalkthrough, WalkthroughContext } from "./WalkthroughContext";

interface WalkthroughProps {
  children: React.ReactNode;
}

function Walkthrough({ children }: WalkthroughProps) {
  const idList = React.Children.toArray(children)
    .filter((c) => (c as any).props?.id)
    .map((comps) => (comps as any).props.id);

  if (checkForDuplicates(idList)) {
    console.error(
      "Warning! Your walkthrough has duplicate ids which may result in unexpected behaviour!"
    );
  }

  const [activeStep, setLocalActiveStep] = useState(idList[0]);

  const activeIndex = idList.indexOf(activeStep);

  const isLast = idList.indexOf(activeStep) === idList.length - 1;

  const { length } = idList;

  const setActiveStep = (newActiveStep: number | string) => {
    setLocalActiveStep(newActiveStep);
  };

  const next = () => {
    setLocalActiveStep((old) => idList[idList.indexOf(old) + 1]);
  };

  const goTo = (id: string | number) => {
    setLocalActiveStep(idList[idList.indexOf(id)]);
  };

  const back = () => {
    const newStep = idList.indexOf(activeStep) - 1;

    if (idList.indexOf(newStep) >= 1) {
      setLocalActiveStep(newStep);
    }
  };

  return (
    <WalkthroughContext.Provider
      value={{
        setActiveStep,
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
    </WalkthroughContext.Provider>
  );
}

interface WalkthroughStepProps {
  id: number | string;
  children: React.ReactNode;
}

Walkthrough.Step = function WalkthroughStep({
  id,
  children,
}: WalkthroughStepProps) {
  const { activeStep } = useWalkthrough();

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
  }: {
    next: () => void;
    goTo: (id: string | number) => void;
    isLast: boolean;
  }) => React.ReactNode;
}

Walkthrough.Next = function NextButton({ children }: NextButtonProps) {
  const { next, goTo, isLast } = useWalkthrough();

  return <>{children({ next, goTo, isLast })}</>;
};

interface BackButtonProps {
  children: (back: () => void) => React.ReactNode;
}

Walkthrough.Back = function BackButton({ children }: BackButtonProps) {
  const { back } = useWalkthrough();

  return <>{children(back)}</>;
};

Walkthrough.Heading = function Heading({ children }: { children: string }) {
  return <h2 className="text-center h2">{children}</h2>;
};

// Walkthrough.Waypoints = function Waypoints() {
//   const { length, activeIndex } = useWalkthrough();

//   return (
//     <div className="flex justify-center">
//       <div className="flex space-x-3">
//         {Array.from(Array(length), (e, i) => (
//           <div
//             className={clsx("w-2.5 h-2.5 bg-gray-200 rounded-full transition", {
//               "bg-gray-400 rounded-full ring-2 ring-gray-200":
//                 activeIndex === i,
//             })}
//             key={i}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

function checkForDuplicates(array: Array<string | number>) {
  return new Set(array).size !== array.length;
}

export default Walkthrough;

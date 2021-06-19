import React, { useState } from "react";

import { HikerContext, useHikerContext } from "@components/HikerContext";

interface HikerProps {
  children: React.ReactNode;
  initial?: string;
}

function Hiker({ children, initial }: HikerProps) {
  // get all ids of child Hiker.Step components and create a list
  // we need that for making next() and back() possible
  const idList: string[] = React.Children.toArray(children)
    .flat()
    .filter((c) => c.props?.id)
    .map((comps) => comps.props.id);

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

  const setActiveStep = (newActiveStep: string) => {
    setLocalActiveStep(newActiveStep);
  };

  const next = () => {
    // canot go further than the last element
    if (activeIndex === idList.length - 1) {
      return;
    }

    setLocalActiveStep((old) => idList[idList.indexOf(old) + 1]);
  };

  const goTo = (id: string) => {
    setLocalActiveStep(idList[idList.indexOf(id)]);
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
    return (
      // <motion.div
      //   initial={{ opacity: 0 }}
      //   animate={{ opacity: 1 }}
      //   exit={{ opacity: 0 }}
      // >
      <>{children}</>
      // </motion.div>
    );
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

// Hiker.Waypoints = function Waypoints() {
//   const { length, activeIndex } = useHikerContext();

//   return (
//     <div className="flex justify-center">
//       <div className="flex space-x-3">
//         {Array.from(Array(length), (e, i) => (
//           <div
//             className={classNames(
//               "w-2.5 h-2.5 bg-gray-200 rounded-full transition",
//               {
//                 "bg-gray-400 rounded-full ring-2 ring-gray-200":
//                   activeIndex === i,
//               }
//             )}
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

export default Hiker;

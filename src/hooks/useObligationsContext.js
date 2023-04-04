import { ObligationsContext } from "../context/ObligationContext";
import { useContext } from "react";

export const useObligationsContext = () => {
  const context = useContext(ObligationsContext);

  if (!context) {
    throw Error(
      "useObligationsContext must be used within an ObligationsContextProvider"
    );
  }

  return context;
};

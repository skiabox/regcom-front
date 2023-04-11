import { OrganizationsContext } from "../context/OrganizationContext";
import { useContext } from "react";

export const useOrganizationsContext = () => {
  const context = useContext(OrganizationsContext);

  if (!context) {
    throw Error(
      "useOrganizationsContext must be used within an OrganizationsContextProvider"
    );
  }

  return context;
};

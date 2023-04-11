import { createContext, useReducer } from "react";

export const OrganizationsContext = createContext();

export const organizationsReducer = (state, action) => {
  switch (action.type) {
    case "SET_ORGANIZATIONS":
      return {
        organizations: action.payload
      };
    case "CREATE_ORGANIZATION":
      return {
        organizations: [action.payload, ...state.organizations]
      };
    case "DELETE_ORGANIZATION":
      return {
        organizations: state.organizations.filter(
          o => o._id !== action.payload._id
        )
      };
    default:
      return state;
  }
};

export const OrganizationsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(organizationsReducer, {
    organizations: null
  });

  return (
    <OrganizationsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </OrganizationsContext.Provider>
  );
};

import { createContext, useReducer } from "react";

export const ObligationsContext = createContext();

export const obligationsReducer = (state, action) => {
  switch (action.type) {
    case "SET_OBLIGATIONS":
      return {
        obligations: action.payload
      };
    case "CREATE_OBLIGATION":
      return {
        obligations: [action.payload, ...state.obligations]
      };
    case "DELETE_OBLIGATION":
      return {
        obligations: state.obligations.filter(o => o._id !== action.payload._id)
      };
    default:
      return state;
  }
};

export const ObligationsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(obligationsReducer, {
    obligations: null
  });

  return (
    <ObligationsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ObligationsContext.Provider>
  );
};

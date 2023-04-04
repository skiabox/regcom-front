import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    console.log("inside useLogin hook login async arrow function");
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    //json is the object with email and token and role
    const json = await response.json();
    console.log("Inside Login hook json response: ", json);

    if (!response.ok) {
      setIsLoading(false);
      console.log("json.error: ", json.error);
      setError(json.msg);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);

      console.log("INSIDE useLogin hook json.role: ", json.role);

      return json;
    }
  };

  return { login, error, isLoading };
};

import React from "react";
import { getCurrentUser } from "../apiCalls/authCalls.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUserData } from "../redux/userSlice.js";

function useCurrentUser() {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getCurrentUser();
        const dispatch = useDispatch();
        dispatch(setUserData(result));
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
    fetchUser();
  }, []);
}
export default useCurrentUser;

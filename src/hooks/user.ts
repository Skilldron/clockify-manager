import { Cache } from "@raycast/api";
import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { axiosInstance } from "..";

/**
 * Custom hook to fetch user data.
 * @returns An object containing user data, error message, loading state, and a function to refetch user data.
 */
export function useGetUser() {
  // TODO: This function should only get user informations in raycast's cache if it exists

  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get("/v1/user");
      const data: User = await response.data;
      setUser(data);

      const cache = new Cache({ namespace: "user" });
      cache.set("user", data.id);
    } catch (error) {
      axios.isAxiosError(error)
        ? setError(error.response?.data.message)
        : setError("An error occurred, can't retrieve fetch error.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { user, userError: error, userLoading: loading, refetchUser: fetchUsers };
}

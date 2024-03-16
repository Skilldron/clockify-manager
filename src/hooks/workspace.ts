import { useState, useEffect, useCallback } from "react";

import axios from "axios";
import { axiosInstance } from "..";

export function useGetWorkspaces() {
  const [workspaces, setWorkspaces] = useState<Array<Workspace>>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWorkspaces = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get("/v1/workspaces");
      const data = await response.data;
      setWorkspaces(data);
    } catch (error) {
      axios.isAxiosError(error)
        ? setError(error.response?.data.message)
        : setError("An error occurred, can't retrieve fetch error.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  return { workspaces, workspacesError: error, workspacesLoading: loading, refetchWorkspaces: fetchWorkspaces };
}

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

export function useGetWorkspaceTags(workspaceId: string) {
  const [tags, setTags] = useState<Array<Tag>>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTags = useCallback(
    async (workspaceId: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(`/v1/workspaces/${workspaceId}/tags`);
        const data = await response.data;
        setTags(data);
      } catch (error) {
        axios.isAxiosError(error)
          ? setError(error.response?.data.message)
          : setError("An error occurred, can't retrieve fetch error.");
      } finally {
        setLoading(false);
      }
    },
    [workspaceId],
  );

  useEffect(() => {
    fetchTags(workspaceId);
  }, [fetchTags]);

  return { tags, tagsError: error, tagsLoading: loading, refetchTags: fetchTags };
}

export function useGetWorkspacesProjects(workspaceId: string) {
  const [projects, setProjects] = useState<Array<Project>>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(
    async (workspaceId: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(`/v1/workspaces/${workspaceId}/projects`);
        const data = await response.data;
        setProjects(data);
      } catch (error) {
        axios.isAxiosError(error)
          ? setError(error.response?.data.message)
          : setError("An error occurred, can't retrieve fetch error.");
      } finally {
        setLoading(false);
      }
    },
    [workspaceId],
  );

  useEffect(() => {
    fetchProjects(workspaceId);
  }, [fetchProjects]);

  return { projects, projectsError: error, projectsLoading: loading, refetchProjects: fetchProjects };
}
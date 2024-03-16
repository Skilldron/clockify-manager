import { Color, List, Toast, showToast } from "@raycast/api";
import { useGetWorkspaces } from "./hooks/workspace";
import WorkspaceDetail from "./views/workspaces/itemDetail";
import { useGetUser } from "./hooks/user";

export default function Command() {
  const { user, userError, userLoading, refetchUser } = useGetUser();
  const { workspaces, workspacesError, workspacesLoading, refetchWorkspaces } = useGetWorkspaces();

  if (userError)
    showToast({
      style: Toast.Style.Failure,
      title: "Something went wrong",
      message: userError,
      primaryAction: {
        title: "Retry",
        onAction: refetchUser,
      },
    });

  if (workspacesError)
    showToast({
      style: Toast.Style.Failure,
      title: "Something went wrong",
      message: workspacesError,
      primaryAction: {
        title: "Retry",
        onAction: refetchWorkspaces,
      },
    });

  if (userLoading || workspacesLoading) return <List isLoading />;

  return (
    <List isShowingDetail>
      {workspaces.length != 0 ? (
        workspaces.map((workspace: Workspace, index: number) => (
          <List.Item
            key={index}
            title={workspace.name}
            accessories={
              user!.activeWorkspace == workspace.id
                ? [{ tag: { value: "Default", color: Color.Green }, tooltip: "Workspace used by default" }]
                : null
            }
            detail={<WorkspaceDetail workspace={workspace} />}
          />
        ))
      ) : (
        <List.EmptyView
          icon={{ source: "https://placekitten.com/500/500" }}
          title="Seems you don't have any workspace"
        />
      )}
    </List>
  );
}

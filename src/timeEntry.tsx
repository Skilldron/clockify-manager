import { Action, ActionPanel, Form, LaunchProps, List, Toast, popToRoot, showToast } from "@raycast/api";
import { useGetUser } from "./hooks/user";
import { useGetWorkspaceTags, useGetWorkspaces } from "./hooks/workspace";
import { useEffect, useState } from "react";
import { axiosInstance } from ".";
import axios from "axios";

type TimeEntryForm = {
  start: Date;
  end: Date;
  duration: string;
  project: string;
  tagIds: string[];
  description: string;
  billable: boolean;
  workspace: string;
};

export default function Command(props: LaunchProps<{ draftValues: TimeEntryForm }>) {
  const { draftValues } = props;
  const { user, userError, userLoading, refetchUser } = useGetUser();
  const { workspaces, workspacesLoading } = useGetWorkspaces();
  const [tagSelected, setTagsSelected] = useState<string[]>(draftValues?.tagIds || []);
  const [dateStart, setDateStart] = useState<Date>(draftValues?.start || new Date());
  const [endDate, setEndDate] = useState<Date>(draftValues?.end || new Date());
  const [workspaceSelected, setWorkspaceSelected] = useState<string>(
    draftValues?.workspace || user?.activeWorkspace || ""
    );
  const { tags, refetchTags } = useGetWorkspaceTags(workspaceSelected);
    
  const submitForm = async (values: TimeEntryForm) => {
    const {workspace, ...datas } = values;

    try {
      await axiosInstance.post(`/v1/workspaces/${workspace}/time-entries`, datas);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.message;
        showToast({
          style: Toast.Style.Failure,
          title: "Failed to create time entry",
          message: errorMessage,
        });
        return;
      }
    }

    showToast({
      style: Toast.Style.Success,
      title: "Time entry created",
    });
    popToRoot();
  }

  useEffect(() => {
    refetchTags(workspaceSelected);
  }, [workspaceSelected]);

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

  if (userLoading || workspacesLoading) return <List isLoading />;

  return (
    <Form
      enableDrafts
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Form" onSubmit={submitForm} />
        </ActionPanel>
      }
    >
      <Form.DatePicker
        id="start"
        title="Start"
        onBlur={(e) => (e.target.value ? setDateStart(e.target?.value) : null)}
        defaultValue={dateStart}
      />
      <Form.DatePicker
        id="end"
        title="End"
        onBlur={(e) => (e.target.value ? setEndDate(e.target?.value) : null)}
        defaultValue={endDate}
      />
      <Form.TextArea id="description" title="Description" defaultValue={draftValues?.description} />
      <Form.Dropdown
        id="workspace"
        title="Workspace"
        onChange={(newValue) => {
          setWorkspaceSelected(newValue);
          setTagsSelected([]);
        }}
        defaultValue={workspaceSelected}
      >
        {workspaces.map((workspace) => (
          <Form.Dropdown.Item key={workspace.id} value={workspace.id} title={workspace.name} />
        ))}
      </Form.Dropdown>
      <Form.TagPicker id="tagIds" title="Tags" value={tagSelected} onChange={setTagsSelected}>
        {tags?.map((tag) => <Form.TagPicker.Item key={tag.id} value={tag.id} title={tag.name} />)}
      </Form.TagPicker>
    </Form>
  );
}

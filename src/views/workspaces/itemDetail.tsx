import { List } from "@raycast/api";

export default function WorkspaceDetail({ workspace }: { workspace: Workspace }) {
  return (
    <List.Item.Detail
      metadata={
        <List.Item.Detail.Metadata>
          <List.Item.Detail.Metadata.Link
            title="Settings"
            target={`http://app.clockify.me/workspaces/${workspace.id}/settings`}
            text="Link"
          />
          <List.Item.Detail.Metadata.Separator />
          <List.Item.Detail.Metadata.TagList title="Currencies">
            {workspace.currencies.map((currency: Currency) => (
              <List.Item.Detail.Metadata.TagList.Item key={currency.id} text={currency.code} />
            ))}
          </List.Item.Detail.Metadata.TagList>
          <List.Item.Detail.Metadata.TagList title="Features activated">
            {workspace.features.map((feature: string, index: number) => (
              <List.Item.Detail.Metadata.TagList.Item key={`feature_${index}`} text={feature} />
            ))}
          </List.Item.Detail.Metadata.TagList>
        </List.Item.Detail.Metadata>
      }
      markdown={workspace.imageUrl ? `![Illustration](${workspace.imageUrl})` : null}
    />
  );
}

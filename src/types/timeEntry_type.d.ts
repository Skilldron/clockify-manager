// Request TimeEntry
interface CustomAttribute {
  name: string;
  namespace: string;
  value: string;
}

interface CustomField {
  customFieldId: string;
  sourceType: string;
  value: string;
}

interface TimeEntryRequest {
  billable: boolean;
  customAttributes: CustomAttribute[];
  customFields: CustomField[];
  description: string;
  end: string;
  projectId: string;
  start: string;
  tagIds: string[];
  taskId: string;
  type: string;
}

// Response TimeEntry
interface CustomFieldValue {
  customFieldId: string;
  name: string;
  timeEntryId: string;
  type: string;
  value: string;
}

interface TimeInterval {
  duration: string;
  end: string;
  start: string;
}

interface TimeEntryResponse {
  billable: boolean;
  customFieldValues: CustomFieldValue[];
  description: string;
  id: string;
  isLocked: boolean;
  kioskId: string;
  projectId: string;
  tagIds: string[];
  taskId: string;
  timeInterval: TimeInterval;
  type: string;
  userId: string;
  workspaceId: string;
}

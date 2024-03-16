declare interface CostRate {
  amount: number;
  currency: string;
}

declare interface HourlyRate {
  amount: number;
  currency: string;
}

declare interface Membership {
  costRate: CostRate;
  hourlyRate: HourlyRate;
  membershipStatus: string;
  membershipType: string;
  targetId: string;
  userId: string;
}

declare interface CustomField {
  customFieldId: string;
  customFieldName: string;
  customFieldType: string;
  userId: string;
  value: string;
}

declare interface Settings {
  alerts: boolean;
  approval: boolean;
  collapseAllProjectLists: boolean;
  dashboardPinToTop: boolean;
  dashboardSelection: string;
  dashboardViewType: string;
  dateFormat: string;
  groupSimilarEntriesDisabled: boolean;
  isCompactViewOn: boolean;
  lang: string;
  longRunning: boolean;
  multiFactorEnabled: boolean;
  myStartOfDay: string;
  onboarding: boolean;
  projectListCollapse: number;
  projectPickerTaskFilter: boolean;
  pto: boolean;
  reminders: boolean;
  scheduledReports: boolean;
  scheduling: boolean;
  sendNewsletter: boolean;
  showOnlyWorkingDays: boolean;
  summaryReportSettings: {
    group: string;
    subgroup: string;
  };
  theme: string;
  timeFormat: string;
  timeTrackingManual: boolean;
  timeZone: string;
  weekStart: string;
  weeklyUpdates: boolean;
}

declare interface User {
  activeWorkspace: string;
  customFields: CustomField[];
  defaultWorkspace: string;
  email: string;
  id: string;
  memberships: Membership[];
  name: string;
  profilePicture: string;
  settings: Settings;
  status: string;
}

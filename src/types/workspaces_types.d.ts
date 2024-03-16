declare interface Currency {
  code: string;
  id: string;
  isDefault: boolean;
}

declare interface Rate {
  amount: number;
  currency: string;
}

declare interface Membership {
  costRate: Rate;
  hourlyRate: Rate;
  membershipStatus: string;
  membershipType: string;
  targetId: string;
  userId: string;
}

declare interface WorkspaceSettings {
  adminOnlyPages: string;
  automaticLock: {
    changeDay: string;
    dayOfMonth: number;
    firstDay: string;
    olderThanPeriod: string;
    olderThanValue: number;
    type: string;
  };
  canSeeTimeSheet: boolean;
  canSeeTracker: boolean;
  currencyFormat: string;
  defaultBillableProjects: boolean;
  forceDescription: boolean;
  forceProjects: boolean;
  forceTags: boolean;
  forceTasks: boolean;
  isProjectPublicByDefault: boolean;
  lockTimeEntries: string;
  lockTimeZone: string;
  multiFactorEnabled: boolean;
  numberFormat: string;
  onlyAdminsCreateProject: boolean;
  onlyAdminsCreateTag: boolean;
  onlyAdminsCreateTask: boolean;
  onlyAdminsSeeAllTimeEntries: boolean;
  onlyAdminsSeeBillableRates: boolean;
  onlyAdminsSeeDashboard: boolean;
  onlyAdminsSeePublicProjectsEntries: boolean;
  projectFavorites: boolean;
  projectGroupingLabel: string;
  projectPickerSpecialFilter: boolean;
  round: {
    minutes: string;
    round: string;
  };
  timeRoundingInReports: boolean;
  timeTrackingMode: string;
  trackTimeDownToSecond: boolean;
}

declare interface Workspace {
  costRate: Rate;
  currencies: Currency[];
  featureSubscriptionType: string;
  features: string[];
  hourlyRate: Rate;
  id: string;
  imageUrl: string;
  memberships: Membership[];
  name: string;
  workspaceSettings: WorkspaceSettings;
}

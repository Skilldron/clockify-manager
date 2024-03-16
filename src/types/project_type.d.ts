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

declare interface Project {
  color: string;
  duration: string;
  id: string;
  memberships: Membership[];
  name: string;
  note: string;
  public: boolean;
  workspaceId: string;
}

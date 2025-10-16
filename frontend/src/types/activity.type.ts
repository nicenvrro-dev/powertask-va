export interface CreateActivityLog {
  actorId: string;
  actorName: string;
  actorRole: string;
  action: string;
}

export interface ActivityLog extends CreateActivityLog {
  _id: string;
  createdAt: string;
}

export type ActivityLogStore = {
  createActivityLogLoading: boolean;
  fetchActivityLogLoading: boolean;
  activityLogs: ActivityLog[];

  fetchActivityLogs: () => Promise<ActivityLog[]>;
  createActivityLog: (payload: CreateActivityLog) => Promise<ActivityLog>;
};

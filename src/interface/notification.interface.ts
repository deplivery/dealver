export interface NotificationService {
  sendNotification(recipient: string, message: string, options?: NotificationOptions): Promise<void>;

  cancelNotification(notificationId: string): Promise<void>;

  getNotificationStatus(notificationId: string): Promise<string>;

  validateRecipient(recipient: string): Promise<boolean>;

  updateNotificationSettings(notificationId: string, settings: any): Promise<void>;

  getNotificationHistory(userId: string, fromDate?: Date, toDate?: Date): Promise<Notification[]>;
}

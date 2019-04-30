import Image from './Image';

export interface UserInterface {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  settings: OptionalInformationInterface;
  optionalInformation: OptionalInformationInterface;
  bookmarkedProjects: string[];
  authorization: {
  isUser?: boolean;
  isModerator?: boolean;
  isSuperuser?: boolean;
  };
  notifications: Notification[];
  image?: Image;
}

export interface SettingsInterface {
  language: string;
  receiveNotification: boolean;
}

export interface OptionalInformationInterface {
major: string;
expectedGraduation: {
  month: number;
  year: number;
  };
}

export interface NotificationInterface {
  origin: string;
  originId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
©

import Image from './Image'

export interface Settings {
  language: string,
  receiveNofitification: boolean
}

export interface OptionalInformation {
  major: string,
  expectedGraduation: {
    month: number,
    year: number
  }
}

export interface Notification {
  origin: string,
  originId: string,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date,
}

export interface User {
  _id: string,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  settings: Settings,
  optionalInformation: OptionalInformation,
  bookmarkedProjects: string[],
  authorization: {
    isUser?: boolean,
    isModerator?: boolean,
    isSuperuser?: boolean
  },
  notifications: Notification[],
  image?: Image
}
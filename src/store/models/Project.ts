import Image from './Image'
import { UserNamespace } from '../models/User'

export namespace ProjectNamespace {
  export interface ProjectInterface {
    _id: string;
    user: string;
    title: string;
    description: string;
    images: Image[];
    likedBy: string[];
    members: string[];
    searchingParticipants: boolean;
    isActive: boolean;
    updatedAt: Date;
    createdAt: Date;
  }
  export interface ProjectFeedbackInterface {
    _id: string;
    project: string;
    user: string;
    likedBy: string[];
    content: string;
    comments: ProjectFeedbackCommentInterface[];
    createdAt: Date;
    updatedAt: Date;
  }

  export interface ProjectFeedbackCommentInterface {
    _id: string;
    user: UserNamespace.UserInterface;
    content: string;
    updatedAt: Date;
    createdAt: Date;
  }
}

import Image from './Image'
import { User } from '../models/User'

export interface Feedback {
  _id: string;
  project: string;
  user: string;
  likedBy: string[];
  content: string;
  comments: FeedbackComment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FeedbackComment {
  _id: string;
  user: User;
  content: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface Project {
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

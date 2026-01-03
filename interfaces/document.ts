import { Timestamp } from "firebase/firestore";

export interface IDocument {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

import { IDocument } from "./document";

export interface IUser extends IDocument {
  displayName: string;
  photoURL: string | null;
  email: string;
}

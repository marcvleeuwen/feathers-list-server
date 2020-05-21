import { Provider } from "./provider.model";

export interface User {
  _id?: string;
  emial?:string;
  username?: string;
  avatar?: string;
  password?: string;
  authProviders?: Providers;
  _createdAt?: Date;
  _updatedAt?: Date;
}

interface Providers {
  github?: string;
  google?: string;
  facebook?: string;
  twitter?: string;
  auth0?: string;
}
import { Provider } from "./provider.model";

export interface User {
  _id?: string;
  username?: string;
  avatar?: string;
  email?: string;
  password?: string;
  authProviders?: Array<Provider>;
  _createdOn?: Date;
  _updatedOn?: Date;
}

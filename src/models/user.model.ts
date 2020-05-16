import { Provider } from "./provider.model";

export interface User {
  _id?: string;
  username?: string;
  avatar?: string;
  email?: string;
  authProviders?: Array<Provider>;
  _createdOn?: Date;
  _updatedOn?: Date;
}

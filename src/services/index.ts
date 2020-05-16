import { Application } from '../declarations';
import users from './users/users.service';
import lists from './lists/lists.service';
import items from './items/items.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(users);
  app.configure(lists);
  app.configure(items);
}

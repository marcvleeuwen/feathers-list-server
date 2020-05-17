import { Db, ObjectId } from "mongodb";
import { Service, MongoDBServiceOptions } from "feathers-mongodb";
import { Application } from "../../declarations";
import * as crypto from "crypto";
import { User } from "../../models/user.model";

const gravatarUrl: string = "https://s.gravatar.com/avatar";
const query: string = "s=60";

export class Users extends Service {
  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get("mongoClient");

    client.then((db) => {
      this.Model = db.collection("users");
    });
  }

  create(data: any, params: any): Promise<any> {
    const { password, username, createdAt, avatar } = data;

    // create hash from email
    const hash: string = crypto
      .createHash("md5")
      .update(username && username.toLowerCase())
      .digest("hex");

    // consturct gravatar url to get a default avatar
    const gravatar = `${gravatarUrl}/${hash}?${query}`;

    // create user object to be inserted
    const userData: User = {
      avatar: avatar || gravatar,
      username: username,
      password: password,
      _createdAt: createdAt,
    };

    return super.create(userData, params);
  }

  update(data: any, params: any): Promise<any> {
    const {
      avatar,
      username,
      password,
      updatedAt,
    } = data;

    
    const userData: User = {
      ...data,
      _id: new ObjectId(params.id),
      avatar: avatar,
      username: username,
      password: password,
      _updatedAt: updatedAt,
    };

    return super.update(params.id, userData, params);
  }
}

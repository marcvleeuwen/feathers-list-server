import { Db } from "mongodb";
import { Service, MongoDBServiceOptions } from "feathers-mongodb";
import { Application } from "../../declarations";
import { List } from "../../models/list.model";
import app from "../../app";

export class Lists extends Service {
  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get("mongoClient");

    client.then((db) => {
      this.Model = db.collection("lists");
    });
  }

  create(data: any, params: any): Promise<any> {
    const { details, createdAt } = data;
    const { user } = params;

    // create user object to be inserted
    const listData: List = {
      details: details,
      users: [
        {
          username: user.username,
          role: "creator",
        },
      ],
      _createdAt: createdAt,
    };

    return super.create(listData, params);
  }

  update(data: any, params: any): Promise<any> {
    const { details, updatedAt, items } = params;

    console.log('update data', data);
    console.log('update params', params);

    const listData: List = {
      details,
      items,
      _updatedAt: updatedAt,
    };

    return super.update(data, listData, params);
  }
}

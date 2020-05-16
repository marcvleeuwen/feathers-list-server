import { Db, ObjectID } from "mongodb";
import { Service, MongoDBServiceOptions } from "feathers-mongodb";
import { Application } from "../../declarations";
import { List } from "../../models/list.model";
import { Item } from "../../models/item.model";

export class Items extends Service {
  constructor(
    options: Partial<MongoDBServiceOptions>,
    private app: Application
  ) {
    super(options);

    const client: Promise<Db> = app.get("mongoClient");

    client.then((db) => {
      this.Model = db.collection("lists");
    });
  }

  async create(data: any, params: any): Promise<any> {
    const { listId, items, createdAt } = data;

    const listDetails: List = await this.app
      .service("lists")
      .get(listId, params);

      console.log("listDetails before", listDetails);

    const listData: List = {
      ...listDetails,
      _updatedAt: createdAt,
    };

    items.forEach((item: Item) => listData.items?.push(item = {...item, _id: new ObjectID()}));

    console.log("listDetails after", listDetails);
    console.log("listData", listData);

    return super.update(listId, listData, params);
  }
}

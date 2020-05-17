import {Db, ObjectID} from "mongodb";
import {MongoDBServiceOptions, Service} from "feathers-mongodb";
import {Application} from "../../declarations";
import {List} from "../../models/list.model";
import {Item} from "../../models/item.model";

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
    const {listId, items, createdAt} = data;

    const listDetails: List = await this.app
      .service("lists")
      .get(listId, params);

    const listData: List = {
      ...listDetails,
      _updatedAt: createdAt,
    };

    console.log('items', items);
    console.log('listData before', listData);

    // Only get items that need to be added to the list
    const itemsToCreate: Item[] = items
      .filter((item: Item) => !item._id);

    itemsToCreate.forEach((item: Item) =>
      listData.items?.push({...item, _id: new ObjectID()})
    );

    // Only get items that already exist in the list
    const itemsToUpdate: Item[] = items
      .filter((item: Item) =>
        !itemsToCreate.includes(item));

    itemsToUpdate.forEach((item: Item) => {
      // IDs are passed in as a string and need to be converted back to an objectID
      item._id = new ObjectID(item._id);
      const index = listData.items?.findIndex((value: Item) =>
        String(value._id) === String(item._id));
      if (index && listData.items && listData.items[index]) {
        listData.items[index] = item;
      }
    });

    console.log('listData after', listData)

    return super.update(listId, listData, params);
  }
}

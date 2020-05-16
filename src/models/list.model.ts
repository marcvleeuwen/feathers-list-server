import { Descriptor } from "./descriptor.model";
import { ListUser } from "./list-user.model";
import { Item } from "./item.model";

export interface List {
    _id?: string;
	details?: Descriptor;
	items?: Array<Item>
	users?: Array<ListUser>;
	_createdAt?: Date;
	_updatedAt?: Date;
}
import { Descriptor } from "./descriptor.model";

export interface Item {
	_id?: any;
	details?: Descriptor;
	category?: string;
	_createdOn?: Date;
	_updatedOn?: Date
}
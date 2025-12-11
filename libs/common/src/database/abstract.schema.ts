import { Prop } from "@nestjs/mongoose";
import { SchemaTypes, type Types } from "mongoose";

export class AbstractDocument {
	@Prop({ type: SchemaTypes.ObjectId })
	_id: Types.ObjectId;
}

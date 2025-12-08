import { AbstractRepository } from "@app/common";
import { Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument } from "./models/users.schema";
import { Model } from "mongoose";

export class UserRepository extends AbstractRepository<UserDocument> {
	logger = new Logger(UserRepository.name);

	constructor(@InjectModel(UserDocument.name) userModel: Model<UserDocument>) {
		super(userModel);
	}
}

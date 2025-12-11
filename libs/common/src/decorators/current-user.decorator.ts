import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import type { UserDocument } from "apps/auth/src/users/models/users.schema";

const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
	return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
	(_, context: ExecutionContext) => getCurrentUserByContext(context),
);

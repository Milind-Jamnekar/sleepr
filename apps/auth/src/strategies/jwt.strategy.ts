import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserDocument } from "../users/models/users.schema";
import { UsersService } from "../users/users.service";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { tokenPayload } from "../interfaces/token-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly userService: UsersService,
		private readonly configService: ConfigService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: any) =>
					request?.cookies?.Authentication || request?.Authentication,
			]),
			secretOrKey: configService.get("JWT_SECRET"),
		});
	}

	async validate({ userId }: tokenPayload): Promise<UserDocument> {
		return this.userService.getUser({ _id: userId });
	}
}

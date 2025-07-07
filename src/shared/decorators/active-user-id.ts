import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

export const ActiveUserId = createParamDecorator<never>((_, context: ExecutionContext) => {
	const request = context.switchToHttp().getRequest<Request>();

	if (!request.userId) {
		throw new UnauthorizedException();
	}

	return request.userId;
});

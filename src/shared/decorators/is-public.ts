import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'IS_PUBLIC';

export const IsPublic = (isPublic = true) => SetMetadata(IS_PUBLIC_KEY, isPublic);

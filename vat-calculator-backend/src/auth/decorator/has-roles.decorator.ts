import { SetMetadata } from '@nestjs/common';
import { roles } from '../dto/enums';

export const HasRoles = (...roles: roles[]) => SetMetadata('roles', roles);

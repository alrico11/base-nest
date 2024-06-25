import type { PureAbility } from '@casl/ability';
import type { PrismaQuery, Subjects } from '@casl/prisma';
import { PrismaModels } from './prisma.@types';

export type AbilityAction = 'create' | 'read' | 'update' | 'delete' | 'manage';

export type AbilityTypes = PureAbility<
  [AbilityAction, Subjects<PrismaModels>],
  PrismaQuery<PrismaModels>
>;

import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { OrganizationListener } from './organization.listener';
import { OrganizationRepository } from './organization.repository';
import { OrganizationService } from './organization.service';

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService, OrganizationListener,],
  exports: [OrganizationService]
})
export class OrganizationModule { }

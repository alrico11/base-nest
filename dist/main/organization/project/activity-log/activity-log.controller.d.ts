import { ActivityLogService } from './activity-log.service';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { UpdateActivityLogDto } from './dto/update-activity-log.dto';
export declare class ActivityLogController {
    private readonly activityLogService;
    constructor(activityLogService: ActivityLogService);
    create(createActivityLogDto: CreateActivityLogDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateActivityLogDto: UpdateActivityLogDto): string;
    remove(id: string): string;
}

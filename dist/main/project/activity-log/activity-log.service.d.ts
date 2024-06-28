import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { UpdateActivityLogDto } from './dto/update-activity-log.dto';
export declare class ActivityLogService {
    create(createActivityLogDto: CreateActivityLogDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateActivityLogDto: UpdateActivityLogDto): string;
    remove(id: number): string;
}

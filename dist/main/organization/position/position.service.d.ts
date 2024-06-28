import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
export declare class PositionService {
    create(createPositionDto: CreatePositionDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePositionDto: UpdatePositionDto): string;
    remove(id: number): string;
}

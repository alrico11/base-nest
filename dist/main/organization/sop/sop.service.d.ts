import { CreateSopDto } from './dto/create-sop.dto';
import { UpdateSopDto } from './dto/update-sop.dto';
export declare class SopService {
    create(createSopDto: CreateSopDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateSopDto: UpdateSopDto): string;
    remove(id: number): string;
}

import { SopService } from './sop.service';
import { CreateSopDto } from './dto/create-sop.dto';
import { UpdateSopDto } from './dto/update-sop.dto';
export declare class SopController {
    private readonly sopService;
    constructor(sopService: SopService);
    create(createSopDto: CreateSopDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateSopDto: UpdateSopDto): string;
    remove(id: string): string;
}

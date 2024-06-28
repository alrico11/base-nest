import { DepartementService } from './departement.service';
import { CreateDepartementDto } from './dto/create-departement.dto';
import { UpdateDepartementDto } from './dto/update-departement.dto';
export declare class DepartementController {
    private readonly departementService;
    constructor(departementService: DepartementService);
    create(createDepartementDto: CreateDepartementDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDepartementDto: UpdateDepartementDto): string;
    remove(id: string): string;
}

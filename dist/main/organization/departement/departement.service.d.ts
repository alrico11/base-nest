import { CreateDepartementDto } from './dto/create-departement.dto';
import { UpdateDepartementDto } from './dto/update-departement.dto';
export declare class DepartementService {
    create(createDepartementDto: CreateDepartementDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDepartementDto: UpdateDepartementDto): string;
    remove(id: number): string;
}

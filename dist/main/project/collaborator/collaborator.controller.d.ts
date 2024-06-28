import { CollaboratorService } from './collaborator.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
export declare class CollaboratorController {
    private readonly collaboratorService;
    constructor(collaboratorService: CollaboratorService);
    create(createCollaboratorDto: CreateCollaboratorDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCollaboratorDto: UpdateCollaboratorDto): string;
    remove(id: string): string;
}

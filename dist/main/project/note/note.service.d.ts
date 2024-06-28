import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
export declare class NoteService {
    create(createNoteDto: CreateNoteDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateNoteDto: UpdateNoteDto): string;
    remove(id: number): string;
}

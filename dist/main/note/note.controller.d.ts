import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
export declare class NoteController {
    private readonly noteService;
    constructor(noteService: NoteService);
    create(createNoteDto: CreateNoteDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateNoteDto: UpdateNoteDto): string;
    remove(id: string): string;
}

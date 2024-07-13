import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentModule as MainProjectComment} from 'src/main/task/comment';

@Module({
  imports: [MainProjectComment],
  controllers: [CommentController],
})
export class CommentModule { }

import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentModule as MainComment} from 'src/main/task/comment';

@Module({
  imports: [MainComment],
  controllers: [CommentController],
})
export class CommentModule { }

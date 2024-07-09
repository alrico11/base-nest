import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { User } from '@prisma/client';
import { Lang, LangEnum } from 'src/constants';
import { UserInstance } from '../auth';
import { CreateCommentTaskBodyDto, CreateCommentTaskParamDto, DeleteCommentTaskParamDto, FindAllCommentTaskParam, FindAllCommentTaskQuery, UpdateCommentTaskBodyDto, UpdateCommentTaskParamDto } from './comment.dto';
import { CommentService } from './comment.service';

@Controller('task/:taskId/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post()
  create(@Body() body: CreateCommentTaskBodyDto, @Param() param: CreateCommentTaskParamDto, @UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.commentService.create({ body, lang, param, user });
  }

  @Get()
  findAll(@Query() query: FindAllCommentTaskQuery, @Param() param: FindAllCommentTaskParam, @Lang() lang: LangEnum) {
    return this.commentService.findAll({ lang, param, query });
  }

  @Patch(':id')
  update(@Param() param: UpdateCommentTaskParamDto, @Body() body: UpdateCommentTaskBodyDto, @UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.commentService.update({ body, lang, param, user });
  }

  @Delete(':id')
  remove(@Param('id') param: DeleteCommentTaskParamDto, @UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.commentService.remove({ lang, param, user });
  }
}

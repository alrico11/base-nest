import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { DeviceHeaders, Lang, LangEnum } from 'src/constants';
import { UserInstance, UserJwtGuard } from '../auth';
import { CreateCommentTaskBodyDto, CreateCommentTaskParamDto, DeleteCommentTaskParamDto, FindAllCommentTaskParam, FindAllCommentTaskQuery, UpdateCommentTaskBodyDto, UpdateCommentTaskParamDto } from './comment.dto';
import { CommentService } from './comment.service';
import { ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDeviceGuard } from '../device';

@ApiTags('Main Comment')
@ApiHeaders(DeviceHeaders)
// @UseGuards(UserJwtGuard, UserDeviceGuard)
@UseGuards(UserJwtGuard)
@Controller('task/:taskId/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ operationId: 'Create Comment' })
  @Post()
  create(@Body() body: CreateCommentTaskBodyDto, @Param() param: CreateCommentTaskParamDto, @UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.commentService.create({ body, lang, param, user });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'FindAll Comment' })
  @Get()
  findAll(@Query() query: FindAllCommentTaskQuery, @Param() param: FindAllCommentTaskParam, @Lang() lang: LangEnum) {
    return this.commentService.findAll({ lang, param, query });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'Update Comment' })
  @Patch(':id')
  update(@Param() param: UpdateCommentTaskParamDto, @Body() body: UpdateCommentTaskBodyDto, @UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.commentService.update({ body, lang, param, user });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'Delete Comment' })
  @Delete(':id')
  remove(@Param() param: DeleteCommentTaskParamDto, @UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.commentService.remove({ lang, param, user });
  }

}
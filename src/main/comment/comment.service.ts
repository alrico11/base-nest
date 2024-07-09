import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { LangResponse } from 'src/constants';
import { FileService } from 'src/file';
import { PrismaService } from 'src/prisma';
import { dotToObject } from 'src/utils/string';
import { ICreateCommentTask, IDeleteComment, IFindAllComment, IUpdateComment } from './comment.@types';

@Injectable()
export class CommentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService
  ) { }

  async create({ body, lang, param, user }: ICreateCommentTask) {
    await this.prisma.$transaction(async (prisma) => {
      const comment = await prisma.comment.create({
        data: {
          authorId: user.id,
          ...body
        }
      })
      await prisma.taskComment.create({
        data: { ...param, commentId: comment.id }
      })
    })

    return { message: LangResponse({ key: "created", lang, object: "comment" }) };
  }

  async findAll({ lang, param, query }: IFindAllComment) {
    const { limit, orderBy, orderDirection, page, search } = query
    const { result, ...rest } = await this.prisma.extended.comment.paginate({
      where: { deletedAt: null, TaskComment: { some: { ...param } } },
      orderBy: dotToObject({ orderBy, orderDirection }),
      limit, page,
      include: {
        Author: { include: { Resource: true } },
        ChildComments: { include: { Author: { include: { Resource: true } } } },
      }
    })
    const data = result.map(({ Author, ChildComments, createdAt, id, content, authorId }) => {
      const referenceComments = ChildComments.map(({ Author, createdAt, id, content, authorId }) => {
        const Resource = Author.Resource
        return {
          id,
          author: {
            authorId,
            thumbnail: Resource && !Array.isArray(Resource) ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
            blurHash: Resource && !Array.isArray(Resource) ? Resource.blurHash : undefined
          },
          content,
          createdAt,
        }
      })
      const Resource = Author.Resource
      return {
        id,
        author: {
          authorId,
          content,
          thumbnail: Resource && !Array.isArray(Resource) ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
          blurHash: Resource && !Array.isArray(Resource) ? Resource.blurHash : undefined
        },
        content, createdAt,
        referenceComments
      }
    })
    return { message: LangResponse({ key: "fetched", lang, object: "comment" }), data: data };
  }

  async update({ body, lang, param: { id, taskId }, user }: IUpdateComment) {
    const commentExist = await this.prisma.comment.findFirst({ where: { id, authorId: user.id, TaskComment: { some: { taskId } } } })
    if (!commentExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "comment" }), HttpStatus.NOT_FOUND)
    await this.prisma.comment.update({ where: { id }, data: body })
    return { message: LangResponse({ key: "updated", lang, object: "comment" }) };
  }

  async remove({ lang, param: { taskId, id }, user }: IDeleteComment) {
    const commentExist = await this.prisma.comment.findFirst({ where: { id, authorId: user.id, TaskComment: { some: { taskId } } } })
    if (!commentExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "comment" }), HttpStatus.NOT_FOUND)
    await this.prisma.comment.update({ where: { id }, data: { deletedAt: dayjs().toDate() } })
    return { message: LangResponse({ key: "deleted", lang, object: "comment" }) };
  }
}

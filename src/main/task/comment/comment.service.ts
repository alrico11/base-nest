import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { LangResponse } from 'src/constants';
import { FileService } from 'src/file';
import { PrismaService } from 'src/prisma';
import { dotToObject } from 'src/utils/string';
import { ICreateCommentTask, IDeleteComment, IFindAllComment, IUpdateComment } from './comment.@types';
import { ProjectRepository } from 'src/main/project';
import { OrganizationRepository } from 'src/main/organization/organization.repository';
import { LogService } from 'src/log';

@Injectable()
export class CommentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
    private readonly projectRepository: ProjectRepository,
    private readonly organizationRepository: OrganizationRepository,
    private readonly l: LogService
  ) { this.l.setContext(CommentService.name) }

  async create({ body, lang, param, user }: ICreateCommentTask) {
    const { taskId, organizationId, projectId } = param;
    if (projectId) {
      const project = await this.projectRepository.findById({ projectId });
      if (!project)
        throw new HttpException(
          LangResponse({ key: 'notFound', lang, object: 'project' }),
          HttpStatus.NOT_FOUND
        );
    }
    if (organizationId) {
      const organization = await this.organizationRepository.findById({ organizationId });
      if (!organization)
        throw new HttpException(
          LangResponse({ key: 'notFound', lang, object: 'organization' }),
          HttpStatus.NOT_FOUND
        );
    }

    await this.prisma.$transaction(async (prisma) => {
      const comment = await prisma.comment.create({
        data: {
          authorId: user.id,
          ...body,
        },
      });
      await prisma.taskComment.create({
        data: { taskId, commentId: comment.id },
      });

      this.l.save({
        data: {
          message: `Comment created with id ${comment.id} by user id ${user.id}`,
        },
        method: 'CREATE',
        newData: comment,
        organizationId: organizationId,
        projectId: projectId,
        userId: user.id,
      });
    });

    return { message: LangResponse({ key: 'created', lang, object: 'comment' }) };
  }

  async findAll({ lang, param, query }: IFindAllComment) {
    const { taskId, organizationId, projectId } = param;
    if (!organizationId && projectId) {
      const project = await this.projectRepository.findById({ projectId });
      if (!project)
        throw new HttpException(
          LangResponse({ key: 'notFound', lang, object: 'project' }),
          HttpStatus.NOT_FOUND
        );
    }
    if (organizationId && !projectId) {
      const organization = await this.organizationRepository.findById({ organizationId });
      if (!organization)
        throw new HttpException(
          LangResponse({ key: 'notFound', lang, object: 'organization' }),
          HttpStatus.NOT_FOUND
        );
    }

    const { limit, orderBy, orderDirection, page, search } = query;
    const { result, ...rest } = await this.prisma.extended.comment.paginate({
      where: {
        deletedAt: null,
        referenceCommentId: null,
        TaskComment: { some: { ...param } },
      },
      orderBy: dotToObject({ orderBy, orderDirection }),
      limit,
      page,
      include: {
        Author: { include: { Resource: true } },
        ChildComments: {
          orderBy: dotToObject({ orderBy, orderDirection }),
          include: {
            Author: {
              include: { Resource: true },
            },
          },
        },
      },
    });

    const data = result.map(({ Author, ChildComments, createdAt, id, content, authorId }) => {
      const referenceComments = ChildComments.map(({ Author, createdAt, id, content, authorId, referenceCommentId }) => {
        const Resource = Author.Resource;
        return {
          id,
          author: {
            authorId,
            thumbnail: Resource && !Array.isArray(Resource) ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
            blurHash: Resource && !Array.isArray(Resource) ? Resource.blurHash : undefined,
          },
          referenceCommentId,
          content,
          createdAt,
        };
      });

      const Resource = Author.Resource;
      const comment = {
        id,
        author: {
          authorId,
          thumbnail: Resource && !Array.isArray(Resource) ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
          blurHash: Resource && !Array.isArray(Resource) ? Resource.blurHash : undefined,
        },
        content,
        createdAt,
      };

      if (referenceComments.length === 0) return comment;
      return {
        ...comment,
        referenceComments,
      };
    });

    return { message: LangResponse({ key: 'fetched', lang, object: 'comment' }), data: data, ...rest };
  }

  async update({ body, lang, param, user }: IUpdateComment) {
    const { taskId, organizationId, projectId, id } = param;
    if (projectId) {
      const project = await this.projectRepository.findById({ projectId });
      if (!project)
        throw new HttpException(
          LangResponse({ key: 'notFound', lang, object: 'project' }),
          HttpStatus.NOT_FOUND
        );
    }
    if (organizationId) {
      const organization = await this.organizationRepository.findById({ organizationId });
      if (!organization)
        throw new HttpException(
          LangResponse({ key: 'notFound', lang, object: 'organization' }),
          HttpStatus.NOT_FOUND
        );
    }

    const commentExist = await this.prisma.comment.findFirst({
      where: { id, authorId: user.id, TaskComment: { some: { taskId } } },
    });
    if (!commentExist)
      throw new HttpException(
        LangResponse({ key: 'notFound', lang, object: 'comment' }),
        HttpStatus.NOT_FOUND
      );

    await this.prisma.comment.update({ where: { id }, data: body });

    this.l.save({
      data: {
        message: `Comment updated with id ${id} by user id ${user.id}`,
      },
      method: 'UPDATE',
      oldData: commentExist,
      newData: { ...commentExist, ...body },
      organizationId: organizationId,
      projectId: projectId,
      userId: user.id,
    });

    return { message: LangResponse({ key: 'updated', lang, object: 'comment' }) };
  }

  async remove({ lang, param, user }: IDeleteComment) {
    const { taskId, organizationId, projectId, id } = param;
    if (projectId) {
      const project = await this.projectRepository.findById({ projectId });
      if (!project)
        throw new HttpException(
          LangResponse({ key: 'notFound', lang, object: 'project' }),
          HttpStatus.NOT_FOUND
        );
    }
    if (organizationId) {
      const organization = await this.organizationRepository.findById({ organizationId });
      if (!organization)
        throw new HttpException(
          LangResponse({ key: 'notFound', lang, object: 'organization' }),
          HttpStatus.NOT_FOUND
        );
    }

    const commentExist = await this.prisma.comment.findFirst({
      where: { id, authorId: user.id, TaskComment: { some: { taskId } } },
    });
    if (!commentExist)
      throw new HttpException(
        LangResponse({ key: 'notFound', lang, object: 'comment' }),
        HttpStatus.NOT_FOUND
      );

    await this.prisma.comment.update({ where: { id }, data: { deletedAt: dayjs().toDate() } });

    this.l.save({
      data: {
        message: `Comment deleted with id ${id} by user id ${user.id}`,
      },
      method: 'DELETE',
      oldData: commentExist,
      newData: { ...commentExist, deletedAt: dayjs().toDate() },
      organizationId: organizationId,
      projectId: projectId,
      userId: user.id,
    });

    return { message: LangResponse({ key: 'deleted', lang, object: 'comment' }) };
  }
}
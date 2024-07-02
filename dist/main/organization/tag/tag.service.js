"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../constants");
const log_1 = require("../../../log");
const prisma_1 = require("../../../prisma");
const string_1 = require("../../../utils/string");
const dayjs_1 = __importDefault(require("dayjs"));
let TagService = class TagService {
    constructor(prisma, l) {
        this.prisma = prisma;
        this.l = l;
    }
    async create({ body: { name }, lang, user, param: { organizationId } }) {
        const organizationExist = await this.prisma.organization.findFirst({ where: { id: organizationId } });
        if (!organizationExist)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "notFound", lang, object: "organization" }), common_1.HttpStatus.NOT_FOUND);
        const data = await this.prisma.tag.create({
            data: {
                name,
                creatorId: user.id,
                organizationId
            }
        });
        this.l.info({ message: `tag with id ${data.id} created by userid ${user.id}` });
        return { message: (0, constants_1.LangResponse)({ key: "created", lang, object: "tag" }) };
    }
    async findAll({ lang, query, user, param: { organizationId } }) {
        const { limit, orderBy, orderDirection, page, search } = query;
        const { result, ...rest } = await this.prisma.extended.tag.paginate({
            where: { deletedAt: null, name: { contains: search, mode: "insensitive" }, creatorId: user.id, organizationId },
            limit, page,
            orderBy: (0, string_1.dotToObject)({ orderBy, orderDirection })
        });
        const data = result.map(({ id, name }) => { return { id, name }; });
        return { message: (0, constants_1.LangResponse)({ key: "fetched", lang, object: "tag" }), data: data, ...rest };
    }
    async update({ body: { name }, lang, param: { id }, user }) {
        const tagExist = await this.prisma.tag.findFirst({ where: { id, deletedAt: null } });
        if (!tagExist)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "notFound", lang, object: 'tag' }), common_1.HttpStatus.NOT_FOUND);
        await this.prisma.tag.update({
            where: { id, deletedAt: null },
            data: { name }
        });
        this.l.info({ message: `tag with id ${id} updated by ${user.id}` });
        return { message: (0, constants_1.LangResponse)({ key: "updated", lang, object: "tag" }) };
    }
    async remove({ lang, param: { id }, user }) {
        const tagExist = await this.prisma.tag.findFirst({ where: { id, deletedAt: null } });
        if (!tagExist)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "notFound", lang, object: 'tag' }), common_1.HttpStatus.NOT_FOUND);
        await this.prisma.tag.update({
            where: { id, deletedAt: null },
            data: { deletedAt: (0, dayjs_1.default)().toISOString() }
        });
        this.l.info({ message: `tag with id ${id} deleted by ${user.id}` });
        return { message: (0, constants_1.LangResponse)({ key: "deleted", lang, object: "tag" }) };
    }
};
exports.TagService = TagService;
exports.TagService = TagService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        log_1.LogService])
], TagService);
//# sourceMappingURL=tag.service.js.map
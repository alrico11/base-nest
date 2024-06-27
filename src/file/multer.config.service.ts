import { Injectable } from "@nestjs/common";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import dayjs from "dayjs";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname, join } from 'path';
import { XConfig } from "src/xconfig";

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  // directory traversal attack prevention by replacing all character that is not alphanumeric or dot <.> or minus <->
  private sanitizeFileName = (fileName: string): string => fileName.replace(/[^a-zA-Z0-9.]/g, '')
  constructor(private config: XConfig) { }
  createMulterOptions(): MulterModuleOptions {
    const dirPath = join(this.config.env.TMP_FILE_PATH)
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          if ((req.user as any)?.id === undefined) return cb(new Error('user not found'), 'tmp/trash')
          const path = join(dirPath, 'user', (req.user as any).id)
          if (!existsSync(path)) mkdirSync(path, { recursive: true })

          return cb(null, path)
        },
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const day = dayjs()
          cb(null, `${this.sanitizeFileName(name)}-${day.toDate().getTime()}${fileExtName}`);
        }
      }),
    };
  }
  removeNonAlphanumeric(value: string) {
    return value.replace(/[^a-zA-Z0-9]/g, "");
  }
}

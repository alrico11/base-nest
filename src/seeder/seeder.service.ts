import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { hashSync } from 'bcrypt';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import fs from 'fs';
import path from 'path';
import { gunzipSync } from 'zlib';
import { PrismaService } from '../prisma/prisma.service';
dayjs.extend(utc)


type TxCtx = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;


@Injectable()
export class SeederService {
  private originalDir: string;
  private targetDir: string;
  constructor(private readonly prisma: PrismaService) {
    this.originalDir = process.cwd();
    this.targetDir = path.join(this.originalDir, 'public/raw');
    process.chdir(this.targetDir);
  }

  async seedAll() {
    console.log("seeding")
  try {
    await this.region()
  } catch (error) {
    console.log(error)
  }
    // await this.devices()
    // await this.user()
  }

  // async seedUser(tx: TxCtx) {
  //   await tx.user.create({
  //     data: {
  //       id: 'c4bc860c-4605-4124-900d-ebd566308ca5',
  //       email: 'alricowibowo@gmail.com',
  //       password: hashSync("user123", GEN_SALT),
  //       name: 'alricowibowo',
  //       phone: "081235135153",
  //       cityId : ""
  //     }
  //   })
  //   await tx.admin.create({
  //     data: {
  //       id: 'c4bc860c-4605-4124-900d-ebd566308ca5',
  //       email: 'alricowibowo@gmail.com',
  //       password: hashSync("user123", GEN_SALT),
  //       name: 'alricowibowo',
  //     }
  //   })
  // }

  // async resource(tx: TxCtx) {
  //   await tx.resource.createMany({
  //     data: [{
  //       objectKey: 'user/Screenshotfrom20240502105030-1714977948228.webp',
  //       objectUrl: 'http://localhost:3000/user/file/cdn/WhatsAppImage20240511at16-1715915212511.webp',
  //       fileName: 'WhatsAppImage20240511at16-1715915212511.webp',
  //       fileType: "image/webp",
  //       fileSize: 19870,
  //       metadata: { "depth": "uchar", "space": "srgb", "width": 492, "format": "webp", "height": 359, "channels": 3, "hasAlpha": false, "hasProfile": false, "isProgressive": false },
  //       blurHash: 'KKFFpW~XS#s:V@WToxxakD'
  //     },
  //     {
  //       objectKey: 'user/Screenshotfrom20240502105030-1714977948123.webp',
  //       objectUrl: 'http://localhost:3000/user/file/cdn/WhatsAppImage20240511at16-1715915212511.webp',
  //       fileName: 'WhatsAppImage20240511at16-1715915212511.webp',
  //       fileType: "image/webp",
  //       fileSize: 19870,
  //       metadata: { "depth": "uchar", "space": "srgb", "width": 492, "format": "webp", "height": 359, "channels": 3, "hasAlpha": false, "hasProfile": false, "isProgressive": false },
  //       blurHash: 'KKFFpW~XS#s:V@WToxxakD'
  //     }
  //     ]
  //   })
  // }

  async seedProvinces(tx: TxCtx) {
    try {
      const content = gunzipSync(fs.readFileSync(path.join(this.targetDir, 'provinces.csv.gz')));
      type ProvinceRaw = [code: string, name: string, latitude: string, longitude: string];
      const provinces = this.csvToArray(content.toString()) as ProvinceRaw[];
      await this.truncate('province')
      await tx.province.createMany({
        data: provinces
          .map((row) => ({
            code: row[0],
            name: row[1],
            latitude: row[2],
            longitude: row[3],
          }))
          .filter((p) => !!p.code),
      });
    } catch (error) {
      throw error
    }
  }

  async seedCities(tx: TxCtx) {
    try {
      type CityRaw = [
        code: string,
        province_code: string,
        name: string,
        latitude: string,
        longitude: string,
      ];
      const content = gunzipSync(
        fs.readFileSync(path.join(process.cwd(), 'cities.csv.gz')),
      );
      const cities = this.csvToArray(content.toString()) as CityRaw[];
      await this.truncate('city')
      const data = await tx.city.createMany({
        data: cities
          .map((row) => ({
            code: row[0],
            provinceCode: row[1],
            name: row[2],
            latitude: row[3],
            longitude: row[4],
          }))
          .filter((p) => !!p.code),
      });
      console.log(data)
    } catch (error) {
      throw error
    }
  }

  async seedDistricts(tx: TxCtx) {
    try {
      type DistrictRaw = [
        code: string,
        city_code: string,
        name: string,
        latitude: string,
        longitude: string,
      ];
      const content = gunzipSync(
        fs.readFileSync(path.join(process.cwd(), 'districts.csv.gz')),
      );
      const districts = this.csvToArray(content.toString()) as DistrictRaw[];
      await this.truncate('district')
      await tx.district.createMany({
        data: districts
          .map((row) => ({
            code: row[0],
            cityCode: row[1],
            name: row[2],
            latitude: row[3],
            longitude: row[4],
          }))
          .filter((p) => !!p.code),
      });
    } catch (error) {
      throw error
    }
  }

  async seedSubDistricts(tx: TxCtx) {
    try {
      type SubDistrictRaw = [
        code: string,
        district_code: string,
        name: string,
        latitude: string,
        longitude: string,
      ];
      await this.truncate('subDistrict')

      fs
        .readdirSync(path.join(process.cwd(), 'subdistricts'))
        .map((file) => {
          const content = gunzipSync(
            fs.readFileSync(path.join(process.cwd(), 'subdistricts', file)),
          );
          const subDistricts = this.csvToArray(
            content.toString(),
          ) as SubDistrictRaw[];

          return tx.subDistrict.createMany({
            data: subDistricts
              .map((row) => ({
                code: row[0],
                districtCode: row[1],
                name: row[2],
                latitude: row[3],
                longitude: row[4],
              }))
              .filter((p) => !!p.code),
          });
        });
    } catch (error) {
      throw error
    }
  }

  async truncate(model: keyof PrismaService) {
    const tableName = await this.prisma.extended[model].getTableName();
    return await this.prisma.$queryRawUnsafe(
      `Truncate "${tableName}" restart identity cascade;`,
    );
  }

  protected csvToArray(csv: string) {
    return csv.split('\n').map((row) => row.split(','));
  }
  async device(tx: TxCtx) {
    const user = await this.prisma.user.findFirst()
    if (!user) throw new Error()
    const device = await tx.device.create({
      data: {
        id: "5b32f064-fdb5-4ce3-a293-ef0842136676",
        fingerprint: "123"
      }
    })
    await tx.userDevice.create({
      data: {
        deviceId: device.id,
        userId: user.id
      }
    })
  }

  async region() {
    await this.prisma.$transaction(
      async (tx) => {
        await this.seedProvinces(tx)
        await this.seedCities(tx)
        await this.seedDistricts(tx)
        await this.seedSubDistricts(tx)
      },
      {
        timeout: 100000,
      },
    )
  }
  async devices() {
    try {
      await this.prisma.$transaction(
        async (tx) => {
          await this.device(tx);
        },
        {
          timeout: 1000,
        },
      );
    } catch (error) {
      console.error("Error creating device:", error);
    }
  }

  // async user() {
  //   try {
  //     await this.prisma.$transaction(
  //       async (tx) => {
  //         await this.seedUser(tx);
  //         await this.resource(tx)
  //       },
  //       {
  //         timeout: 100000,
  //       },
  //     );
  //   } catch (error) {
  //     console.error("Error creating sports:", error);
  //   }
  // }
}

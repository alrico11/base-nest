import { z } from "zod"
import { zDateFormat } from "./zDateFormat"
import { zTimeFormat } from "./zTimeFormat"
import dayjs from "dayjs"
import { HttpException, HttpStatus } from "@nestjs/common"
import { LangEnum, LangResponse } from "./lang"

type TimeType = z.infer<typeof zTimeFormat>
type DateType = z.infer<typeof zDateFormat>
interface DateNowParams {
    date: TimeType,
    time: DateType,
    lang: LangEnum
}
export function DateNow({ date, time, lang }: DateNowParams) {
    const hours = parseInt(time.split(':')[0]);
    const minutes = parseInt(time.split(':')[1]);
    const dateNow = dayjs(date).set('hour', hours).set('minute', minutes);

    const currentDateTime = dayjs();

    if (!dateNow.isAfter(currentDateTime)) {
        throw new HttpException(LangResponse({ key: "dateExp", lang, }), HttpStatus.BAD_REQUEST)
    }
    return true
}

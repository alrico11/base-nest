import { Dayjs } from "dayjs";
interface RangeDates {
    startDate: Dayjs;
    endDate: Dayjs;
}
export declare function rangeDate({ endDate, startDate }: RangeDates): Date[];
export {};

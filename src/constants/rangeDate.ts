import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
interface RangeDates {
    startDate: Dayjs
    endDate: Dayjs
}

export function rangeDate({ endDate, startDate }: RangeDates) {
    let currentDate = dayjs.utc(startDate)
    let allDates: Date[] = []
    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
        allDates.push(currentDate.toDate());
        currentDate = currentDate.add(1, 'day');
    }
    return allDates
}
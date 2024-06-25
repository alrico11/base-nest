import { Queue } from "bull";
export declare class SchedulerListener {
    private queue;
    constructor(queue: Queue);
}

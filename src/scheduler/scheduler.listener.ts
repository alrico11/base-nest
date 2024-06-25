import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common/decorators";
import { Queue } from "bull";
import { SCHEDULER_QUEUE_KEY } from "./scheduler.constans";

@Injectable()
export class SchedulerListener {
  constructor(@InjectQueue(SCHEDULER_QUEUE_KEY) private queue: Queue) { }
}
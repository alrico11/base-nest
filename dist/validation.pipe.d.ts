import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class ZodValidationPipe implements PipeTransform {
    transform(value: unknown, metadata: ArgumentMetadata): unknown;
}

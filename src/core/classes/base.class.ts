import { AggregateRoot } from '@nestjs/cqrs';
import { validateSync } from 'class-validator';

export class BaseClass extends AggregateRoot {
  plainToInstance(): void {
    validateSync(this, { whitelist: true });
  }
}

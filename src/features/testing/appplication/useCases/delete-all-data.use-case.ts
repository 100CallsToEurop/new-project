import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TestingRepository } from '../../infrastructure/repository';
import { Logger } from '@nestjs/common';
export class DeleteAllDataCommand {
  constructor() {}
}

@CommandHandler(DeleteAllDataCommand)
export class DeleteAllDataUseCase
  implements ICommandHandler<DeleteAllDataCommand, void>
{
  private readonly logger = new Logger(DeleteAllDataUseCase.name);
  constructor(private readonly testingRepository: TestingRepository) {}
  async execute(): Promise<void> {
    this.logger.log('Очистка всех данных в БД...');
    await this.testingRepository.deleteAllData();
  }
}

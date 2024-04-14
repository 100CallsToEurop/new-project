import { Controller, Delete, HttpCode, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DeleteAllDataCommand } from '../appplication/useCases';
import { Public } from '../../../common/decorators';

@Controller('testing')
export class TestingController {
  private readonly logger = new Logger(TestingController.name);
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @HttpCode(204)
  @Delete('all-data')
  async deleteAllData(): Promise<void> {
    this.logger.log('Попытка очистки всех данных из БД...');
    await this.commandBus.execute<DeleteAllDataCommand, void>(
      new DeleteAllDataCommand(),
    );
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { ApiCreateAccountController } from './api-create-account.controller';

describe('ApiCreateAccountController', () => {
  let controller: ApiCreateAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiCreateAccountController],
    }).compile();

    controller = module.get<ApiCreateAccountController>(
      ApiCreateAccountController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AccountCreateLoginService } from './create.service';

describe('AccountCreateLoginService', () => {
  let service: AccountCreateLoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountCreateLoginService],
    }).compile();

    service = module.get<AccountCreateLoginService>(AccountCreateLoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

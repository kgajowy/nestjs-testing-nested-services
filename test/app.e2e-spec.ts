import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { ThirdPartyService } from '../src/third-party/third-party.service';
import { RandomService } from '../src/random-module/random.service';

/**
 * This could be an integration test without infrastructure
 */
describe('Random module', () => {
  let fixtures: Awaited<ReturnType<typeof getFixtures>>;

  beforeEach(async () => {
    fixtures = await getFixtures();
  });

  test('some business case', async () => {
    await fixtures.givenThirdPartyAnswers();
    const result = await fixtures.whenDoingStuff('uuid');
    fixtures.thenSomethingHappens(result);
  });
});

async function getFixtures() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(ThirdPartyService)
    .useClass(FakeThirdParty)
    .compile();

  const app = moduleFixture.createNestApplication();
  await app.init();

  const sut = app.get(RandomService);
  const thirdParty: FakeThirdParty = app.get(ThirdPartyService);

  return {
    givenThirdPartyAnswers: () => {
      thirdParty.doRequest.mockResolvedValue('12345');
    },
    whenDoingStuff: (id: string) => sut.doStuff(id),
    thenSomethingHappens: (result: string) => {
      expect(result).toEqual('12345');
    },
  };
}

class FakeThirdParty implements ThirdPartyService {
  doRequest: jest.MockedFunction<ThirdPartyService['doRequest']> = jest.fn();
}

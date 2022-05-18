import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { ThirdPartyService } from '../src/third-party/third-party.service';
import { RandomService } from '../src/random-module/random.service';
import * as nock from 'nock';

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

  test('todos fetching', async () => {
    await fixtures.givenTodosAreAvailable();
    const result = await fixtures.whenDoingStuffWithApi('uuid');
    fixtures.thenWeGotThis(result);
  });

  test.skip('todos fetching while api is not available', async () => {
    /**
     * note disabled response
     * nock will throw, thus test disabled
     */
    // await fixtures.givenTodosAreAvailable();
    const result = await fixtures.whenDoingStuffWithApi('uuid');
    fixtures.thenWeGotThis(result);
  });

  afterAll(() => {
    fixtures?.cleanup();
  });
});

async function getFixtures() {
  nock.disableNetConnect();

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
    givenTodosAreAvailable: () => {
      nock('https://jsonplaceholder.typicode.com')
        .get('/todos')
        .reply(200, 'test response');
    },
    whenDoingStuff: (id: string) => sut.doStuff(id),
    whenDoingStuffWithApi: (id: string) => sut.doStuffWithApi(id),
    thenSomethingHappens: (result: string) => {
      expect(result).toEqual('12345');
    },
    thenWeGotThis: (result: unknown) => {
      expect(result).toEqual('test response');
    },
    cleanup: () => {
      nock.cleanAll();
      nock.enableNetConnect();
    },
  };
}

class FakeThirdParty implements ThirdPartyService {
  doRequest: jest.MockedFunction<ThirdPartyService['doRequest']> = jest.fn();
}

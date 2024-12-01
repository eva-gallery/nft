import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { NFTModule } from "@modules/nftMinter/nft.module";
import { CollectionModule } from "@modules/collectionCreator/collection.module";
import { SwapModule } from "@modules/ownershipSwap/swap.module";
import { MetadataModule } from "@modules/nftMetadata/metadata.module";

describe("App E2E Tests", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        NFTModule,
        CollectionModule,
        SwapModule,
        MetadataModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("/nft (GET)", () => {
    return request(app.getHttpServer())
      .get("/test-create-nft")
      .expect(200)
      .expect(
        '{}',
      );
  });

  it("/collection (GET)", () => {
    return request(app.getHttpServer())
      .get("/test-create-collection")
      .expect(200)
      .expect(
        '"0xc501042802083400006cf3e7bf1cc5f0b87e7aaa8bc5acf2489651b14e768bcf5d9206f878778f4404000000000000000000000000000000000000000000341ae7010000b8516d623167485275703652634d6e3557766f4d6d6b31326e4a6f62327866524566666277794472674661434a744a"',
      );
  });

  it("/swap (GET)", () => {
    return request(app.getHttpServer())
      .get("/test-create-swap")
      .expect(200)
      .expect(
        '"0xa0040a03006cf3e7bf1cc5f0b87e7aaa8bc5acf2489651b14e768bcf5d9206f878778f44040284d717"',
      );
  });

  it("/metadata (GET)", () => {
    return request(app.getHttpServer())
      .get("/test-query-metadata")
      .expect(200)
      .expect([
        {
          id: '110-1352993712',
          createdAt: '2023-08-31T09:57:30.316000Z',
          name: 'Early Participants of Kusama OpenGov - common',
          image: 'ipfs://ipfs/bafybeic7whoguawde3i5nznqw5g77oah6ctla33h7om3t6swat7atln7nu',
          metadata: 'ipfs://ipfs/bafkreieaguxsapna3nkfz2jb7igucuwiab3jcrippeexwxoakiqacw47oe',
          currentOwner: 'EZwaNLfEwAMYcEdbp7uKYFCjnsn43S85pm6BumT5UwvZQvB',
          issuer: 'DT7kRjGFvRKxGSx5CPUCA1pazj6gzJ6Db11xmkX4yYSNK7m'
        }
      ]);
  });
});

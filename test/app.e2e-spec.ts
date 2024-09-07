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
        '"0x15020428020834030100000001000000006cf3e7bf1cc5f0b87e7aaa8bc5acf2489651b14e768bcf5d9206f878778f4404003418010000000100000025017b226e616d65223a226d6f636b65644e616d65222c226d65746164617461223a226d6f636b65644465736372697074696f6e222c22696d616765223a226d6f636b656449706673227d"',
      );
  });

  it("/collection (GET)", () => {
    return request(app.getHttpServer())
      .get("/test-create-collection")
      .expect(200)
      .expect(
        '"0x3502042802083400006cf3e7bf1cc5f0b87e7aaa8bc5acf2489651b14e768bcf5d9206f878778f4404000000000000000000000000000000000000000000341ad601000025017b226e616d65223a226d6f636b65644e616d65222c226d65746164617461223a226d6f636b65644465736372697074696f6e222c22696d616765223a226d6f636b656449706673227d"',
      );
  });

  it("/swap (GET)", () => {
    return request(app.getHttpServer())
      .get("/test-create-swap")
      .expect(200)
      .expect(
        '"0xb00434060100000001000000006cf3e7bf1cc5f0b87e7aaa8bc5acf2489651b14e768bcf5d9206f878778f4404"',
      );
  });

  it("/metadata (GET)", () => {
    return request(app.getHttpServer())
      .get("/test-query-metadata")
      .expect(200)
      .expect([
        {
          id: "u-2015-272",
          createdAt: "2021-11-17T14:00:48.253000Z",
          name: "Your badge of honour GS8cNk9ysUwoBp2ibWYNzjDvR9R4f9iyKoYdnDBbdP1ZDbn",
          image: "ipfs://QmTkod62hhRR3Niwa16SxbHErs9PSzA3yrkDmuo9USNKWj",
          metadata: "Qme6kVhbDvqUSJKy3RwxHaF2u1P726LJNA3Uz2dByFtVhK",
          currentOwner: "EZwaNLfEwAMYcEdbp7uKYFCjnsn43S85pm6BumT5UwvZQvB",
          issuer: "EZwaNLfEwAMYcEdbp7uKYFCjnsn43S85pm6BumT5UwvZQvB",
        },
        {
          id: "110-1352993712",
          createdAt: "2023-08-31T09:57:30.316000Z",
          name: "Early Participants of Kusama OpenGov - common",
          image:
            "ipfs://ipfs/bafybeic7whoguawde3i5nznqw5g77oah6ctla33h7om3t6swat7atln7nu",
          metadata:
            "ipfs://ipfs/bafkreieaguxsapna3nkfz2jb7igucuwiab3jcrippeexwxoakiqacw47oe",
          currentOwner: "EZwaNLfEwAMYcEdbp7uKYFCjnsn43S85pm6BumT5UwvZQvB",
          issuer: "DT7kRjGFvRKxGSx5CPUCA1pazj6gzJ6Db11xmkX4yYSNK7m",
        },
      ]);
  });
});

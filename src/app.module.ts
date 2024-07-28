import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollectionModule } from './collectionCreator/collection.module';
import { MetadataModule } from './nftMetadata/metadata.module';
import { NFTModule } from './nftMinter/nft.module';

@Module({
  imports: [NFTModule,CollectionModule,MetadataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Injectable } from '@nestjs/common';
import { ApiPromise, WsProvider } from '@polkadot/api'
import '@polkadot/api-augment';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { SwapDto } from './dto/SwapDto';

const wsProvider = new WsProvider('wss://westmint-rpc-tn.dwellir.com');


    
    
@Injectable()
export class swapCreator {
       
    async createNFTcall(nft: SwapDto): Promise<any> {
        const { address, collectionID, assetID } = nft;
        const api = await ApiPromise.create({ provider: wsProvider });
       
        const call = api.tx.nfts.transfer(collectionID, assetID, address);

        return call;

      }
    }
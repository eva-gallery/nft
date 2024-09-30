import { Injectable } from '@nestjs/common';
import { ApiPromise, Keyring } from '@polkadot/api';
import { SubmittableExtrinsic } from '@polkadot/api-base/types';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config';

@Injectable()
export class TransactionService {
  constructor(private readonly configService: ConfigService<AppConfig, false>) {}

  public async signAndSendTransaction(
    api: ApiPromise,
    call: SubmittableExtrinsic<'promise'>,
  ): Promise<string> {
    const secretKey = this.configService.get<string>('WALLET_SECRET_KEY');
    const wallet = new Keyring({ type: 'sr25519' });
    const EvaGallerySigner = wallet.addFromUri(secretKey);

    return new Promise<string>((resolve, reject) => {
      call.signAndSend(EvaGallerySigner, async ({ txHash, status, dispatchError }) => {
        if (status.isFinalized) {
          if (dispatchError) {
            if (dispatchError.isModule) {
              const decoded = api.registry.findMetaError(dispatchError.asModule);
              const { docs, name, section } = decoded;
              reject(new Error(`${section}.${name}: ${docs.join(' ')}`));
            } else {
              reject(new Error(dispatchError.toString()));
            }
          } else {
              resolve(txHash.toString());
          }
        }
      });
    });
  }
}

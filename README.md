# EVA-Gallery NFT module 🏗️

This is a module that houses all the operations between the EVA-Gallery and Kusama blockchain (the blockchain is easily interchangeable between Kusama and Polkadot).

#### To install and start the module use the following commands
```bash
npm install //This installs dependencies
npm run start:dev //This starts development instance of REST API (Do not forget to create and fill .env file)
```

## Endpoints 🌐

- `{/healthyz, GET}`: Used to see the health status of the NFT module.
- `{/readyz, GET}`: Used to see if the NFT module is ready to serve requests.
- `{/test-create-swap, GET}`: Used for e2e tests.
- `{/test-query-metadata, GET}`: Used for e2e tests.
- `{/test-create-nft, GET}`: Used for e2e tests.
- `{/test-create-collection, GET}`: Used for e2e tests.
- `{/collection/:id/asset, PUT}`: Used to create non-fungible asset mint call.
  - **Requires the following dto:**
    ```
    NftDto {
      @IsNotEmpty()
      @IsString()
      owner: string;
      @IsNotEmpty()
      @IsFile()
      @HasMimeType(["image/jpeg", "image/png"])
      file: MemoryStoredFile;
      @IsNotEmpty()
      @IsString()
      name: string;
      @IsNotEmpty()
      @IsString()
      metadata: string;
    }
    ```
  - **Requires the following parameters:**
    - `id`: Id of the collection. Example id: "421".
      
- `{/collection/remove/asset/:id, DELETE}`: Used to create extrinsic that burns non-fungible assets on the blockchain.
  - **Requires the following parameters:**
    - `id`: Id of the NFT (Id must also contain the id of the collection as a prefix). Example id: "421-3" where 421 stands for collection ID and 3 for non-fungible ID
      
- `{/update/asset/:id, PUT}`: Used to update the name and description of an asset.
  - **Requires the following dto:**
    ```
    UpdaterDto {
      @IsNotEmpty()
      @IsString()
      imgType: string;
      @IsNotEmpty()
      @IsString()
      imgIpfs: string;
      @IsNotEmpty()
      @IsString()
      name: string;
      @IsNotEmpty()
      @IsString()
      metadata: string;
    }
    ```
  - **Requires the following parameters:**
    - `id`: Id of the NFT (Id must also contain the id of the collection as a prefix). Example id: "421-3" where 421 stands for collection ID and 3 for non-fungible ID
  
- `{/collection/create, PUT}`: Used to create new collection.
  - **Requires the following dto:**
    ```
    CollectionDto {
      @IsNotEmpty()
      @IsString()
      owner: string;
      @IsFile()
      @IsOptional()
      @HasMimeType(["image/jpeg", "image/png"])
      file: MemoryStoredFile;
      @IsString()
      name: string;
      @IsOptional()
      @IsString()
      metadata: string;
    }
    ```
  
- `{/metadata/nft/address/:address, GET}`: Used to load wallet's NFTs.
  - **Requires the following parameters:**
    - `address`: Address of account to be paid into. Example address: 'EZwaNLfEwAMYcEdbp7uKYFCjnsn43S85pm6BumT5UwvZQvB'
      
- `{/metadata/collection/address/:address, GET}`: Used to load wallet's Collections.
  - **Requires the following parameters:**
    - `address`: Address of account to be paid into. Example address: 'EZwaNLfEwAMYcEdbp7uKYFCjnsn43S85pm6BumT5UwvZQvB'
      
- `{/transfer/collection/:collection/asset/:asset, POST}`: Used to transfer ownership of asset (Trial minted assets).
  - **Requires the following dto:**
    ```
    SwapDto {
      @IsNotEmpty()
      @IsString()
      address: string;
    }
    ```
  - **Requires the following parameters:**
    - `collection`: Id of the collection. Example id: "421".
    - `asset`: Id of the non-fungible. Example id: "1".
  
- `{/pay/:address, GET}`: Used to retrieve payment address.
  - **Requires the following parameters:**
    - `address`: Address of account to be paid into. Example address: 'EZwaNLfEwAMYcEdbp7uKYFCjnsn43S85pm6BumT5UwvZQvB'
      
- `{/trial/mint, PUT}`: Used to trial mint user's artwork to NFT.
  - **Requires the following dto:**
    ```
    TrialDto {
      @IsNotEmpty()
      @IsFile()
      @HasMimeType(["image/jpeg", "image/png"])
      file: MemoryStoredFile;
      @IsNotEmpty()
      @IsString()
      name: string;
      @IsNotEmpty()
      @IsString()
      metadata: string;
    }
    ```
    
- `{/eva/wallet/address, GET}`: Used to retrieve Gallery wallet from the mnemonic set in `.env` file.
  
- `{/eva/wallet/collection, GET}`: Used to retrieve Gallery collection hardcoded in `.env` file.

## .env 📁
The module requires `.env` configuration:

```
.env example
#APP STARTUP PORT
PORT=3000
#BACKEND URL
BACKEND_URL=http://localhost:4200
# WSS_ENDPOINT for intracting with blockchain
WSS_ENDPOINT=wss://kusama-asset-hub-rpc.polkadot.io
# Secret 12/24 word phrase for wallet that will do trialmint
WALLET_SECRET_KEY= word word word word word word word word word word word word;
# Hardcoded collection ID that will be used for trial mint
EVA_GALLERY_COLLECTION=1;
# IPFS node URL address
IPFS_URL=http://147.1.1.0
# IPFS node user name authentification
IPFS_NAME=ipfsnode
# IPFS node password authentification
IPFS_PASSWORD=ipfspass
```

## Other commands 🗣️

The module contains basic tests that can be run with `npm run test` command.

The module also contains end-to-end tests that can be run with the `npm run test:e2e` command.

To format the changes use `npm run format` command

To lint the changes use `npm run lint` command

To install and start module use following commands
```bash
npm install //This installs dependencies
npm run start:dev //This starts development instance of REST API (Do not forget to create and fill .env file)
```

## PUT /collection/{id}/asset
Endpoint to generate NFT based on provided parameters.
Example of JSON Body: 
```
{
          "metadata": {
              "name": "Example asset name",
              "description": "Example asset description",
              "ipfs": "IPFS image link"
              "author": "address"
          },
}
```

## PUT /collection
Endpoint to generate new collection based on provided parameters.
Example of JSON Body:
```
{
          "owner": "address"
          "metadata": {
              "name": "Example NFT name",
              "description": "Example NFT description",   //OPTIONAL PARAMETER
              "ipfs": "IPFS image link" //OPTIONAL PARAMETER
          },
}
```

## POST /transfer/collection/{collection}/asset/{asset}
Endpoint to change owner of the non-fungible asset.
Example of JSON Body:
```
{
          "address": "13TrdLhMVLcwcEhMYLcqrkxAgq9M5gnK1LZKAF4VupVfQDUg",
}
```

All POST endpoints return HEX encoded call that is then passed to BE which prompts signer to sign the transaction (Implementation to BE will be added soon)

## GET /address/{address}
Requires 1 url parameter called ```address``` returns all NFTs owned by provided address.

## Example of FETCH REQUEST Implementation
```
    const response = await fetch("http://localhost:3000/collection/1/asset", {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "metadata": {
              "name": "Example asset name",
              "description": "Example asset description",
              "ipfs": "IPFS image link"
              "author": "13TrdLhMVLcwcEhMYLcqrkxAgq9M5gnK1LZKAF4VupVfQDUg"
          },
       })
    });
  const resp = await response.json();
```

Returns following call HEX:
```
"0x71020428020834030100000002000000006cf3e7bf1cc5f0b87e7aaa8bc5acf2489651b14e768bcf5d9206f878778f4404003418010000000200000081017b226e616d65223a224578616d706c65206173736574206e616d65222c226465736372697074696f6e223a224578616d706c65206173736574206465736372697074696f6e222c2269706673223a224950465320696d616765206c696e6b227d"
```

Which when decoded turns into the following BATCH of calls to create NFT:

<img width="1135" alt="img" src="https://github.com/user-attachments/assets/ea18b53e-adcb-4864-9a05-e37ef2817fea">

## Test GET endpoints:
- test-create-collection
- test-create-nft
- test-query-metadata
- test-create-swap

## E2E tests:
npm run test:e2e

## .env

```
.env example
#APP STARTUP PORT
PORT=3000
#BACKEND URL
BACKEND_URL=http://localhost:4200
# WSS_ENDPOIINT for intracting with blockchain
WSS_ENDPOINT=wss://sys.dotters.network/statemine
# Secret 12/24 word phrase for wallet that will do trialmint
WALLET_SECRET_KEY= bla bla bla bla bla bla bla bla bla bla bla bla;
# URL for NFT MODULE
NFT_MODULE_URL=http://localhost:3000
# Hardcoded collection ID that will be used for trial mint
EVA_GALLERY_COLLECTION=1;
# IPFS node URL address
IPFS_URL=http://147.1.1.0
# IPFS node user name authentification
IPFS_NAME=ipfsnode
# IPFS node password authentification
IPFS_PASSWORD=ipfspass
# Provider for blockchain interaction
WSS_PROVIDER=wss://kusama-asset-hub-rpc.polkadot.io
# Eva gallery wallet address
EVA_GALLERY_WALLET_ADDRESS=DdiySauWxbBeQxUaHzFETA7qhzY53aFiENACtYZQ3Cno127
```
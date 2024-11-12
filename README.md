To install and start module use following commands
```bash
npm install //This installs dependencies
npm run start:dev //This starts development instance of REST API (Do not forget to create and fill .env file)
```

## Endpoints

TBA

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
```

## Other commands
TBA

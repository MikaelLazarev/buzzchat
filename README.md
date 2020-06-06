# Buzzzchat
## Decentralised chat app using Bluzelle DB

### Components

/src - Node.JS server

/mobile - Mobile Client (React native)

/web - Web Client (React native web)

### How to install

Clone repository

#### Installing server

1. Go to main folder
2. Install all dependecies:
```yarn``` or ```npm i```
3. Create a configuration file
```touch ./src/config/config.json```
4. Open config file and fill with properties:
```
{
  "port": <Server port, default: 4000>,
  "bluzelle_mnemonic": <Mnemonic for Bluzelle account>,
  "bluzelle_endpoint": <Bluzelle server entry point>,
  "bluzelle_chain_id": <Bluzelle chain_id>,
  "mainDB": "<Main Bluzelle DB UUID>",
  "jwt_secret": "<JWT Secret>",
  "sentryDSN": "<Sentry DSN code>",
  "twillio_sid" : "<Twillio account ID>",
  "twillio_key" : "<Twillio api key>"
}
```
5. Save configuration
6. Check that account has enough funds for operations
7. Start server ```yarn dev``` or ```npm start dev``` for development


#### Starting mobile apps

1. Go to /mobile folder
2. Install all node modules with ```yarn``` or ```npm i```
3. Open ./config.ts and provide server address. For local start, please provide you local network address instead localhost:
```
export const BACKEND_ADDR = 'http://192.168.0.47:4000';

export const SSO_ADDR = 'http://192.168.0.47:4000';
```
4. Go to ./mobile/ios and install ios modules with ```pod install```
5. Run iOS app with ```yarn ios``` or ```npm start ios```
6. Run Android app with ```yarn android``` or ```npm start android```

#### Starting web application
1. Go to /web folder
2. Install all node modules with ```yarn``` or ```npm i```
3. Open ./config.ts and provide server address. For local start, please provide you local network address instead localhost:
```
export const BACKEND_ADDR = 'http://192.168.0.47:4000';

export const SSO_ADDR = 'http://192.168.0.47:4000';
```

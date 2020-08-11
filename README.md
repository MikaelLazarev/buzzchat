# Buzzzchat
## Decentralised chat app for iOS and Android based on Bluzelle DB

<img src='https://user-images.githubusercontent.com/26343374/84579279-33fbca00-add5-11ea-90f6-decec39ec6cd.png' width='22%'>&nbsp;&nbsp;&nbsp;<img src='https://user-images.githubusercontent.com/26343374/84579273-2e9e7f80-add5-11ea-851b-d7c658fc15a0.png' width='22%'>&nbsp;&nbsp;&nbsp;<img src='https://user-images.githubusercontent.com/26343374/84579278-33633380-add5-11ea-87b7-8e7125610885.png' width='22%'>&nbsp;&nbsp;&nbsp;<img src='https://user-images.githubusercontent.com/26343374/84579276-32320680-add5-11ea-8a0b-7431aed48fed.png' width='22%'>

### Features

[x] Works on both Android and iOS  
[x] Web browser PC support. Must somehow use phone to authenticate web browser app, like WhatsApp.  
[ ] Use IPFS to enable file transfers, avatars, etc. All files must be encrypted.  
[ ] Room chat messages are encrypted and have signing proofs  
[x] Ability for message owners to delete their own messages.  

### Components

/src - Node.JS server  
/mobile - Mobile Client (React native)  
/web - Web Client (React native web)  

### How to install

### Prerequisites
To install this package you should have:

- NodeJS and package manager
- XCode (for iOS)
- Java 14 & android studio (for Android)
- Bluzelle testnet account with enough funds for testing
- Sentry account
- Active Twillio account (with ability to send sms to any phone numbers)

### Installation

1. Clone this repository ```git clone git@github.com:MikaelLazarev/buzzchat.git```
2. Go to buzzchat folder: ```cd buzzchat```
3. Install node modules: ```yarn``` or ```npm i```
4. Create a configuration file (do not use json file in production!):
```mv ./src/config/config.sample.json ./src/config/config.json```
5. Open config file and fill with properties:
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
  "twillio_key" : "<Twillio api key>",
  "twillio_from" : "<Twillio outgouing number>",
  "send_to_debug": "<if true it sends all codes to debug_phone>",
  "debug_phone" : "<debug phone number to get all auth codes if send_to_debug is set>",
  "cipher_hash": "<Initial key for Hash IV>",
  "cipher_key": "<Cipher key>"
}
```
6. Save configuration
7. Check that your Bluzelle account has enough funds for operations
8. Start server ```yarn dev``` or ```npm start dev``` for local development. (Do not use dev in production)


#### Starting mobile apps

1. Go to /mobile folder: ```cd mobile```
2. Install node modules: ```yarn``` or ```npm i```
3. Open ./config.ts and provide server address. For local start, please provide you local network address instead localhost:
```
export const BACKEND_ADDR = 'http://192.168.0.47:4000';

export const SSO_ADDR = 'http://192.168.0.47:4000';
```
4. Go to /ios folder: ```cd ios``` and install ios modules with ```pod install```
5. Check that your Android environment set up correctly (env vars: ANDROID_HOME & PATH to Andoird SDK). Mac OS example:
```
export ANDROID_HOME=~/Library/Android/sdk/
export PATH=$PATH:~/android-sdks/platform-tools/
export PATH=$PATH:~/android-sdks/tools/
```
6. Run iOS app with ```yarn ios``` or ```npm start ios```
7. Run Android app with ```yarn android``` or ```npm run android```

Building Android App:
- Open Android studio
- Open android/ folder as project
- Menu - Build - Build Signed APK / Bundle app
- With opened window answer choose App Bundle if you want to upload to Google store or APK if you are going to upload local device
- Confirm upgrading gradle version if it's required
- App asks you to generate a key if you haven't by filling simple form

You will get .apk or .aab file, which could be upload to device (https://help.gamesalad.com/gamesalad-cookbook/testing/ad-hoc-test-on-your-android-device/4-06-ad-hoc-testing-on-an-android-device/) of to Google Store

#### Starting web application

1. Go to /web folder
2. Install all node modules with ```yarn``` or ```npm i```
3. Open ./config.ts and provide server address. For local start, please provide you local network address instead localhost:
```
export const BACKEND_ADDR = 'http://192.168.0.47:4000';

export const SSO_ADDR = 'http://192.168.0.47:4000';
```
4. Start developer server with ```yarn start``` or ```npm run start```

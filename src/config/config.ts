import fs from 'fs';
import Ajv from 'ajv';

export interface ConfigParams {
  port: number;
  bluzelle_mnemonic: string;
  bluzelle_endpoint: string;
  bluzelle_chain_id: string;
  mainDB: string;
  jwt_secret: string;
  ts_customerId : string,
  ts_apiKey : string,
  ts_rest_endpoint : string,
  ts_timeout : number,
}

const configSchema = {
  type: 'object',
  required: [
    'port',
    'bluzelle_mnemonic',
    'bluzelle_endpoint',
    'bluzelle_chain_id',
    'mainDB',
    'jwt_secret',
    "ts_customerId",
    "ts_apiKey",
    "ts_rest_endpoint",
    "ts_timeout"
  ],
};

export function getConfig(): ConfigParams {
  const fileName = __dirname + '/config.json';

  let configData: ConfigParams;

  try {
    if (fs.existsSync(fileName)) {
      const configFileContent = fs.readFileSync(fileName);
      configData = JSON.parse(configFileContent.toString());

    } else {
      configData = {
        port: parseInt(process.env.PORT || '5000'),
        bluzelle_mnemonic: process.env.BLUZELLE_MNEMONIC || '',
        bluzelle_endpoint: process.env.BLUZELLE_ENDPOINT || '',
        bluzelle_chain_id: process.env.BLUZELLE_CHAIN_ID || '',
        mainDB: process.env.MAIN_DB || 'BuzzChat',
        jwt_secret: process.env.JWT_SECRET || '',
        ts_customerId: process.env.TS_CUSTOMER_ID || '',
        ts_apiKey: process.env.TS_API_KEY || '',
        ts_rest_endpoint: process.env.REST_ENDPOINT || '',
        ts_timeout: parseInt(process.env.TS_TIMEOUT || '10'),
      };
    }

    const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
    const validate = ajv.compile(configSchema);

    const valid = validate(configData);
    if (!valid) {
      console.log(validate.errors);
      process.abort();
    }
  } catch (e) {
    console.log('Cant process configuration data', e);
    process.exit(1);
  }

  return configData;
}
const config = getConfig();

export default config;

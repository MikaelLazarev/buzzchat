import fs from 'fs';
import Ajv from 'ajv';

export interface ConfigParams {
  port: number;
  bluzelle_mnemonic: string;
  bluzelle_endpoint: string;
  bluzelle_chain_id: string;
  mainDB: string;
  jwt_secret: string;
  twillio_sid: string;
  twillio_key: string;
  twillio_from: string;
  sentryDSN: string;
  send_to_debug: boolean;
  debug_phone: string;
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
    'twillio_sid',
    'twillio_key',
    'twillio_from',
    'sentryDSN',
    'send_to_debug',
    'debug_phone',
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
        twillio_sid: process.env.TWILLIO_SID || '',
        twillio_key: process.env.TWILLIO_KEY || '',
        twillio_from: process.env.TWILLIO_FROM || '',
        sentryDSN: process.env.SENTRY_DSN || '',
        send_to_debug: process.env.SEND_TO_DEBUG === 'true' ? true : false,
        debug_phone: process.env.DEBUG_PHONE || '',
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

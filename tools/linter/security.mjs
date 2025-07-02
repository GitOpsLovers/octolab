import pii from 'eslint-plugin-pii';
import noSecrets from 'eslint-plugin-no-secrets';

export default [
  {
    plugins: {
      pii,
      'no-secrets': noSecrets,
    },
    rules: {
      'pii/no-email': 'error',
      'pii/no-ip': 'error',
      'pii/no-phone-number': 'error',
      'no-secrets/no-secrets': 'error',
    },
  },
];
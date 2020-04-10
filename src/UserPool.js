
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_lAhkX47Qv',
  ClientId: '7n3ndm98v6esq4cendi0gumbr1'
};

export default new CognitoUserPool(poolData);
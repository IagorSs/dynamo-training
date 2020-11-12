import AWS from 'aws-sdk';

export default function Config() {
  if (process.env.AWS_ACCESS_KEY === ''
			|| process.env.AWS_SECRET_ACCESS_KEY === ''
			|| process.env.AWS_DEFAULT_REGION === ''
			|| process.env.DYNAMO_ENDPOINT === '') {
		throw new Error('Variáveis de acesso da AWS não estão configuradas');
	}

  AWS.config.credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  };

	AWS.config.region = process.env.AWS_DEFAULT_REGION;

	AWS.config.dynamodb = { endpoint: process.env.DYNAMO_ENDPOINT };
}
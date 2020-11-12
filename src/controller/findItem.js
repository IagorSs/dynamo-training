import AWS from 'aws-sdk/clients/dynamodb.js';

export function getItem(CPF){
  const docClient = new AWS.DocumentClient();

  return docClient.get({
    TableName: process.env.DYNAMO_TABLENAME,
    Key: {
      CPF,
    }
  }).promise();
}

export default async function findItem(req, res) {
  try {
    const docClient = new AWS.DocumentClient();
  
    const dataPromise = await getItem(req.body.CPF);
  
    return res.status(200).json({ response: dataPromise.Item });

  } catch (error) {
    return res.status(500).json({ error });
  }

}
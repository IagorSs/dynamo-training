import AWS from 'aws-sdk/clients/dynamodb.js';
import { getItem } from './findItem.js';

export default async function updateItem(req, res) {
  try {
    const docClient = new AWS.DocumentClient();

    const { CPF, key, value} = req.body;

    const dataItem = await getItem(CPF);
  
    const dataPromise = await docClient.update({
      TableName: process.env.DYNAMO_TABLENAME,
      Key: { CPF },
      AttributeUpdates: {
        state: {
          Action: 'PUT',
          Value: {
            ...dataItem.Item.state,
            updatedOn: new Date().toString(),
          },
        },
        [key]: {
          Action: 'PUT',
          Value: value,
        }
      }
    }).promise();
  
    return res.status(200).json({ response: dataPromise.Item });

  } catch (error) {
    return res.status(500).json({ error });
  }

}
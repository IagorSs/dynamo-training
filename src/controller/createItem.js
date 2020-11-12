import AWS from 'aws-sdk/clients/dynamodb.js';

export default async function createItem(req, res) {
  try {
    const docClient = new AWS.DocumentClient();

    const {
      name,
      email,
      birth,
      CPF
    } = req.body
  
    const dataPromise = await docClient.put({
      TableName: process.env.DYNAMO_TABLENAME,
      Item: {
        CPF,
        Name: name,
        Email: email,
        Birth: birth,
        state: {
          createdOn: new Date().toString(),
          updatedOn: new Date().toString(),
          isDeleted: false,
        },
      }
    }).promise();
  
    return res.status(200).json({ response: dataPromise.Item });
    
  } catch (error) {
    return res.status(500).json({ error });
  }
}
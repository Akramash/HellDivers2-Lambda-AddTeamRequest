import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

// Create an instance of the DynamoDB client
const client = new DynamoDBClient({ region: process.env.OPERATING_REGION });
// Create the DocumentClient
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    const { teamId, title, level } = JSON.parse(event.body);
    const params = {
        TableName: process.env.DYNAMODB_TABLE_NAME, // Use environment variable for the table name
        Item: { 
            teamId, 
            title, 
            members: 0, // Creator is the first member
            level
        },
    };

    try {
        await docClient.send(new PutCommand(params));
        return { statusCode: 200, body: JSON.stringify({ message: 'Team request added' }) };
    } catch (error) {
        console.error(error);
        return { statusCode: 500, body: JSON.stringify({ message: 'Failed to add team request' }) };
    }
};
// Import your Lambda function
import { handler as lambdaHandler } from './index.js';

// Simulate an API Gateway event
const event = {
    body: JSON.stringify({
        teamId: "testTeamId",
        title: "Test Title",
        members: 4
    })
};

// Invoke your Lambda function
lambdaHandler(event)
    .then(response => console.log("Lambda response:", response))
    .catch(err => console.error("Lambda execution error:", err));

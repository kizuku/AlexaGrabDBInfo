const alexaSDK = require('alexa-sdk');
const awsSDK = require('aws-sdk');

const appID = 'INSERT SKILL ID HERE';
const table = 'Records';
const docClient = new awsSDK.DynamoDB.DocumentClient();

const instructions = `Welcome to Records Organizer<break strength="medium" />
                      The following commands are available: get record. What would you like to do?`;

const handlers = {

    // Triggered when the user says "Alexa, open Records Organizer"
    'LaunchRequest'() {
        this.emit(':ask', instructions);
    },

    // Reads the full info of the selected recipe.
    // Slots: Number
    'GetRecordIntent'() {
        const { slots } = this.event.request.intent;
        
        // prompt for slot data if needed
        if (!slots.Number.value) {
            const slotToElicit = 'Number';
            const speechOutput = 'What number is the record?';
            const repromptSpeech = 'Please tell me the number of the record';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        const { userID } = this.event.session.user;
        const number = slots.Number.value;
        const dynamoParams = { 
            TableName: table,
            Key: {
                Number: number
            }
        };

        console.log('Attempting to read data');

        // query DynamoDB
        docClient.get(dynamoParams).promise()
            .then(data => {
                console.log('Get item succeeded', data);

                const record = data.Item;

                if (record) {
                    this.emit(':tell', `Record ${number} took ${record.TimeElapsed} to complete and was completed ${record.DateTime}.
                                Its ID is ${record.ID}. It's category is ${record.Category} and is located in ${record.Area} 
                                on node ${record.Node}, unit ${record.Unit}, module ${record.Module}.
                                Its parameter is ${record.Parameter} and state is ${record.State}. Its level is ${record.Level}.`);
                }
                else {
                    this.emit(':tell', `Record ${record} not found!`);
                }
            })
            .catch(err => console.error(err));
    },

    'Unhandled'() {
        console.error('problem', this.event);
        this.emit(':ask', 'An unhandled problem occurred!');
    },

    'AMAZON.HelpIntent'() {
        const speechOutput = instructions;
        const reprompt = instructions;
        this.emit(':ask', speechOutput, reprompt);
    },

    'AMAZON.CancelIntent'() {
        this.emit(':tell', 'Goodbye!');
    },

    'AMAZON.StopIntent'() {
        this.emit(':tell', 'Goodbye!');
    }
};

exports.handler = function handler(event, context) {
    const alexa = alexaSDK.handler(event, context);
    alexa.APP_ID = appID;
    alexa.registerHandlers(handlers);
    alexa.execute();
}
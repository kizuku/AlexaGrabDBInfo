const alexaSDK = require('alexa-sdk');
const awsSDK = require('aws-sdk');

const appID = 'amzn1.ask.skill.2700ad03-fa29-4096-974b-a2ca70b577f6';
const table = 'Records';
const docClient = new awsSDK.DynamoDB.DocumentClient();

const instructions = `Welcome to Records Organizer<break strength="medium" />
                      The following commands are available: get record. What would you like to do?`;

const handlers = {

    // Triggered when the user says "Alexa, open Records Organizer"
    'LaunchRequest'() {
        this.emit(':ask', instructions);
    },
    
    // Adds a record to the current user's saved records.
    // Slots: Number, Date, Time, Category, Area, Unit, Module, ModuleDesc, Parameter, State, Level, Desc
    // NOTE: INTENDED ONLY FOR TESTING USE.
    'AddRecordIntent'() {
        const { userID } = this.event.session.user;
        const { slots } = this.event.request.intent;

        // prompt for slot values and request a confirmation for each

        // Number
        if (!slots.Number.value) {
            const slotToElicit = 'Number';
            const speechOutput = 'What is the number of the record you would like to add?';
            const repromptSpeech = 'Please tell me the number of the record';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if (slots.Number.confirmationStatus !== 'CONFIRMED') {
            if (slots.Number.confirmationStatus !== 'DENIED') {
                const slotToConfirm = 'Number';
                const speechOutput = `The number of the record is ${slots.Number.value}, correct?`;
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            const slotToElicit = 'Number';
            const speechOutput = 'What is the number of the record you would like to add?';
            const repromptSpeech = 'Please tell me the number of the record';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        // Date
        if (!slots.Date.value) {
            const slotToElicit = 'Date';
            const speechOutput = 'What date did the record occur on?';
            const repromptSpeech = 'Please tell me the date of the record';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if (slots.Date.confirmationStatus !== 'CONFIRMED') {
            if (slots.Date.confirmationStatus !== 'DENIED') {
                const slotToConfirm = 'Date';
                const speechOutput = `The record occured on ${slots.Date.value}, correct?`;
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            const slotToElicit = 'Date';
            const speechOutput = 'What date did the record occur on?';
            const repromptSpeech = 'Please tell me the date of the record';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        // Time
        if (!slots.Time.value) {
            const slotToElicit = 'Time';
            const speechOutput = 'What time did the record occur at?';
            const repromptSpeech = 'Please tell me at what time the record occurred';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if (slots.Time.confirmationStatus !== 'CONFIRMED') {
            if (slots.Time.confirmationStatus !== 'DENIED') {
                const slotToConfirm = 'Time';
                const speechOutput = `The record occurred at ${slots.Time.value}, correct?`;
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            const slotToElicit = 'Time';
            const speechOutput = 'What time did the record occur at?';
            const repromptSpeech = 'Please tell me at what time the record occurred';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        // Category
        if (!slots.Category.value) {
            const slotToElicit = 'Category';
            const speechOutput = 'What is the category of this record?';
            const repromptSpeech = 'Please tell me the category of this record';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if (slots.Category.confirmationStatus !== 'CONFIRMED') {
            if (slots.Category.confirmationStatus !== 'DENIED') {
                const slotToConfirm = 'Category';
                const speechOutput = `The category of this record is ${slots.Category.value}, correct?`;
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }
            
            const slotToElicit = 'Category';
            const speechOutput = 'What is the category of this record?';
            const repromptSpeech = 'Please tell me the category of this record';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        // Area
        if (!slots.Area.value) {
            const slotToElicit = 'Area';
            const speechOutput = 'What is the area of this record?';
            const repromptSpeech = 'Please tell me the area of this record';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if (slots.Area.confirmationStatus !== 'CONFIRMED') {
            if (slots.Area.confirmationStatus !== 'DENIED') {
                const slotToConfirm = 'Area';
                const speechOutput = `The area of this record is ${slots.Area.value}, correct?`;
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            const slotToElicit = 'Area';
            const speechOutput = 'What is the area of this record?';
            const repromptSpeech = 'Please tell me the area of this record';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        // Unit
        if (!slots.Unit.value) {
            const slotToElicit = 'Unit';
            const speechOutput = 'What is the unit of this record?';
            const repromptSpeech = 'Please tell me the unit of this record';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if (slots.Unit.confirmationStatus !== 'CONFIRMED') {
            if (slots.Unit.confirmationStatus !== 'DENIED') {
                const slotToConfirm = 'Unit';
                const speechOutput = `The unit of this record is ${slots.Unit.value}, correct?`;
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            const slotToElicit = 'Unit';
            const speechOutput = 'What is the unit of this record?';
            const repromptSpeech = 'Please tell me the unit of this record';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        // Module
        if (!slots.Module.value) {
            const slotToElicit = 'Module';
            const speechOutput = 'What is the module of this record?';
            const repromptSpeech = 'Please tell me the module of this record';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if (slots.Module.confirmationStatus !== 'CONFIRMED') {
            if (slots.Module.confirmationStatus !== 'DENIED') {
                const slotToConfirm = 'Module';
                const speechOutput = `The module of this record is ${slots.Module.value}, correct?`;
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            const slotToElicit = 'Module';
            const speechOutput = 'What is the module of this record?'
            const repromptSpeech = 'Please tell me the module of this record';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        // ModuleDesc
        if (!slots.ModuleDesc.value) {
            const slotToElicit = 'ModuleDesc';
            const speechOutput = 'What is the module description of this record?';
            const repromptSpeech = 'Please tell me the module description of this record';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if (slots.ModuleDesc.confirmationStatus !== 'CONFIRMED') {
            if (slots.ModuleDesc.confirmationStatus !== 'DENIED') {
                const slotToConfirm = 'ModuleDesc';
                const speechOutput = `The module description of this record is ${slots.ModuleDesc.value}, correct?`;
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            const slotToElicit = 'ModuleDesc';
            const speechOutput = 'What is the module description of this record?';
            const repromptSpeech = 'Please tell me the module description of this record';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        // Parameter 
        if (!slots.Parameter.value) {
            const slotToElicit = 'Parameter';
            const speechOutput = 'What is the parameter of this record?';
            const repromptSpeech = 'Please tell me the parameter of this record';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if (slots.Parameter.confirmationStatus !== 'CONFIRMED') {
            if (slots.Parameter.confirmationStatus !== 'DENIED') {
                const slotToConfirm = 'Parameter';
                const speechOutput = `The parameter of this record is ${slots.Parameter.value}, correct?`;
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            const slotToElicit = 'Parameter';
            const speechOutput = 'What is the parameter of this record?';
            const repromptSpeech = 'Please tell me the parameter of this record';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        // State
        if (!slots.State.value) {
            const slotToElicit = 'State';
            const speechOutput = 'What is the state of this record?';
            const repromptSpeech = 'Please tell me the state of this record';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if (slots.State.confirmationStatus !== 'CONFIRMED') {
            if (slots.State.confirmationStatus !== 'DENIED') {
                const slotToConfirm = 'State';
                const speechOutput = `The state of this record is ${slots.Parameter.value}, correct?`;
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            const slotToElicit = 'State';
            const speechOutput = 'What is the state of this record?';
            const repromptSpeech = 'Please tell me the state of this record';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        // Level
        if (!slots.Level.value) {
            const slotToElicit = 'Level';
            const speechOutput = 'What is the level of this record?';
            const repromptSpeech = 'Please tell me the level of this record';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if (slots.Level.confirmationStatus !== 'CONFIRMED') {
            if (slots.Level.confirmationStatus !== 'DENIED') {
                const slotToConfirm = 'Level';
                const speechOutput = `The level of this record is ${slots.Level.value}, correct?`;
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            const slotToElicit = 'Level';
            const speechOutput = 'What is the level of this record?';
            const repromptSpeech = 'Please tell me the level of this record';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        // Desc
        if (!slots.Desc.value) {
            const slotToElicit = 'Desc';
            const speechOutput = 'What is the description of this record?';
            const repromptSpeech = 'Please tell me the description of this record';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if (slots.Desc.confirmationStatus !== 'CONFIRMED') {
            if (slots.Desc.confirmationStatus !== 'DENIED') {
                const slotToConfirm = 'Desc';
                const speechOutput = `The description of this record is ${slots.Desc.value}, correct?`;
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            const slotToElicit = 'Desc';
            const speechOutput = 'What is the description of this record?';
            const repromptSpeech = 'Please tell me the description of this record';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        // all slot values received and confirmed, now add the record to DynamoDB
        // NOTE: may have to change types of slots to adjust for DB
        const number = slots.Number.value;
        const date = slots.Date.value;
        const time = slots.Time.value;
        const category = slots.Category.value;
        const area = slots.Area.value;
        const unit = slots.Unit.value;
        const module = slots.Module.value;
        const moduleDesc = slots.ModuleDesc.value;
        const parameter = slots.Parameter.value;
        const state = slots.State.value;
        const level = slots.Level.value;
        const desc = slots.Desc.value;

        const dynamoParams = {
            TableName: table,
            Item: {
                Number: number,
                Date: date,
                Time: time,
                Category: category,
                Area: area,
                Unit: unit,
                Module: module,
                ModuleDesc: moduleDesc,
                Parameter: parameter,
                State: state,
                Level: level,
                Desc: desc
            }
        };

        const checkIfRecordExistsParams = {
            TableName: table,
            Key: {
                Number: number
            }
        };

        console.log('Attempting to add recipe', dynamoParams);

        // query DynamoDB to see if the item exists first
        docClient.get(checkIfRecordExistsParams).promise()
            .then(data => {
                console.log('Get item succeeded', data);
                const record = data.Item;

                if (record) {
                    const errorMsg = `Record number ${number} already exists!`;
                    this.emit(':tell', errorMsg);
                    throw new Error(errorMsg);
                }
                else {
                    // no match, add the record
                    return docClient.put(dynamoParams).promise();
                }
            })
            .then(data => {
                console.log('Add item succeeded', data);
                this.emit(':tell', `Record number ${number} added!`);
            })
            .catch(err => {
                console.error(err);
            });
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
                    this.emit(':tell', `Record number ${number} occurred on ${record.Date} at ${record.Time}.
                                Its category is ${record.Category} and is located in ${record.Area} 
                                on unit ${record.Unit}, module ${record.Module}, with the following module description: ${record.ModuleDesc}.
                                Its parameter is ${record.Parameter} and state is ${record.State}. Its level is ${record.Level} and has the following description:
                                ${record.Desc}.`);
                }
                else {
                    this.emit(':tell', `Record number ${number} not found!`);
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
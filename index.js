const Alexa = require('ask-sdk-core');
const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        DessertIntentHandler,
        HelpIntentHandler,
        CancelAndStopRequestHandler,
        SessionEndedRequestHandler
    )
    .lambda();

const DessertIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'DessertIntent'
    },
    handle(handlerInput) {
        const dessert = handlerInput.requestEnvelope.request.intent.slots.Dessert.value
        const answer = 'Your dessert of the day is ${dessert}'
        const reprompt = 'Would you like another dessert?'


        return handlerInput.responseBuilder
            .speak(answer + reprompt)
            .reprompt(reprompt)
            .withShouldEndSession(false)
            .getResponse()
    },
}

const ErrorHandler = {
    canHandle() {
        return true
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('Can you please repeat that?')
            .reprompt('Can you please repeat that?')
            .withShouldEndSession(false)
            .getResponse()
    },
}

const builder = Alexa.SkillBuilders.custom()

exports.handler = builder
    .addRequestHandlers(DessertIntentHandler)
    .addErrorHandler(ErrorHandler)
    .lambda()
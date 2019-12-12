const Alexa = require('ask-sdk-core');

const randomDessert = ['Boston Creme Pie', 'Ice Cream', 'Cake', 'Cheesecake']
const randomDessertGenerator = Math.floor(Math.random() * randomDessert.length)
const randomDessertAnswer = randomDessert[randomDessertGenerator]

//const randomDessert = {['Boston Creme Pie', 'Ice Cream', 'Cake', 'Cheesecake']

const CancelAndStopRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
                handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent')
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('Enjoy your dessert!')
            .withShouldEndSession(true)
            .getResponse()
    },
}

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent'
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak("I'm sorry, I didn't understand that. Do you want a dessert?")
            .reprompt("Would you like the dessert of the day?")
            .withShouldEndSession(false)
            .getResponse()
    }
}

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak("Dessert of the day will help you figure out what you would like for a treat. You can say 'give me a dessert' to get started.")
            .reprompt("Dessert of the day will help you figure out what you would like for a treat. You can say 'give me a dessert' to get started.")
            .withShouldEndSession(false)
            .getResponse()
    },
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('Welcome to dessert of the day!')
            .reprompt('Ask for a dessert?')
            .withShouldEndSession(false)
            .getResponse()
    },
}

const DessertIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'DessertIntent'
    },

    handle(handlerInput) {
        const answer = `Your dessert of the day is ${randomDessertAnswer}. `
        const reprompt = 'Ask again!'


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

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'EndRequest'
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('Thank you for using dessert of the day!')
            .reprompt('Enjoy your desert!')
            .withShouldEndSession(true)
            .getResponse()
    },
}

const builder = Alexa.SkillBuilders.custom()

exports.handler = builder
    .addRequestHandlers(
        LaunchRequestHandler,
        FallbackIntentHandler,
        DessertIntentHandler,
        HelpIntentHandler,
        CancelAndStopRequestHandler,
        SessionEndedRequestHandler)
    .addErrorHandlers(ErrorHandler)
    .lambda()
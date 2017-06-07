const Bottr = require('bottr');
const BottrApp = require('bottr-app');
const bot = new Bottr.Bot();

var apiai = require('apiai');
var app = apiai("4ff413a1f14a4ae6aa902cb3b9f46eb0");

bot.use(new BottrApp());

bot.on('message_received', function(message, session, next) {

      // Ignore message if it is an attachment
      if (message.attachments) {
        next()
        return
      }

      var options = {
          sessionId: 'bottr-apiai-chatbot-117777-22'
      }

      var request = app.textRequest(message.text, {
    sessionId: 'bottr-apiai-chatbot-117777-22'
});

      request.on('response', function(response) {

        if (response.result.fulfillment.speech) {
          session.send(response.result.fulfillment.speech)
        }

        if (response.result.action) {
          bot.trigger(response.result.action, message, session, next)
        }

        message.data = response.result
      });

      request.on('error', function(error) {
        console.log(error);
        session.send('I seem to be having a few problems at the moment, sorry :(')
      });

      request.end()
});

bot.listen();

const TelegaBot = require('telega-bot');
const bot = new TelegaBot('BOT ID!');
bot.start();

const API1 = 'https://cataas.com/cat';
const API2 = 'https://cataas.com/cat/gif';

// Log every text message
bot.on('text', function (msg) {
    console.log(`[text] ${ msg.chat.id } ${ msg.text }`);
});

// On command "cataas" or "cataasgif"

bot.on(['/cataas', '/cataasgif'], function (msg) {

    let promise;
    let id = msg.chat.id;
    let cmd = msg.text.split(' ')[0];

    // Photo or gif?
    if (cmd == '/cataas') {
        promise = bot.sendPhoto(id, API1, {
            fileName: 'cataas.jpg',
            serverDownload: true
        });
    } else {
        promise = bot.sendDocument(id, API2, {
            fileName: 'cataas.gif',
            serverDownload: true
        });
    }
	
    // Send "uploading photo" action
    bot.sendAction(id, 'upload_photo');

    return promise.catch(error => {
        console.log('[error]', error);
        // Send an error
        bot.sendMessage(id, `😿 An error occurred, try again later.\n${error.description}`);
    });

});

bot.on('/start', (msg) => {
    return msg.reply.text('Hey, Welcome to the Cataas Telegram Bot, Use /cataas or /cataasgif for pics and gifs!', { asReply: true });
});

bot.on('/help', (msg) => {
    return msg.reply.text('Hey, Welcome to the Cataas Telegram Bot Help page,\nUse /cataas to get a cat image\nUse /cataasgif to get a cat gif', { asReply: true });
});
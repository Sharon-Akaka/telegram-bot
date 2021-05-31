import { Telegraf } from 'telegraf'
import getBotTokenOrQuit from './util/getBotToken';
import fetch from 'node-fetch';

const botToken = getBotTokenOrQuit();

const bot = new Telegraf(botToken)

bot.start((ctx) => ctx.reply("Hello!  Let's talk!"))
bot.help((ctx) => ctx.reply('Hmm i am not programmed to be helpful, yet!'))
bot.hears('hello', (ctx) => ctx.reply('Ok, I heard you say hello'))
bot.command('sing', (ctx) => ctx.reply('La la la!  I got your command.'))

bot.launch()

bot.command('joke', async (ctx) => {
    const response = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        },
    });
   const jokeReponse =  await response.json()
   ctx.reply(jokeReponse.joke)
   console.log(jokeReponse.joke)
})



// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

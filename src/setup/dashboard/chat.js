export default (bot, { client, server }) => {
  bot.hear(message => {
    client.send('message', message);
  });

  server.on('channels', message => {
    const channels = bot.channels.map(a => ({ ...a, isChannel: true }));
    const ims = bot.ims.map(a => ({ ...a, isIM: true }));
    message.reply(channels.concat(ims));
  });

  server.on('users', message => {
    message.reply(bot.users);
  });

  server.on('history', async (message, { channel }) => {
    const method = channel.startsWith('D') ? 'im' : 'channels';

    const history = await bot.call(`${method}.history`, { channel });

    message.reply(history.messages || []);
  });

  server.on('react', async (message, data) => {
    const msg = data.message;
    const emojis = data.emojis;

    const response = await bot.call('reactions.get', {
      channel: msg.channel,
      timestamp: msg.ts
    });
    const reactions = response.message.reactions || [];

    reactions.forEach(async reaction => {
      await bot.call('reactions.remove', {
        channel: msg.channel,
        timestamp: msg.ts,
        name: reaction.name
      });
    });

    emojis.forEach(emoji => {
      bot.react(msg.channel, msg.ts, emoji);
    });
  });
};

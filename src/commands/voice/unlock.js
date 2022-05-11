const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const perms = await client.checkBotPerms({
        flags: [Discord.Permissions.FLAGS.MANAGE_CHANNELS],
        perms: ["MANAGE_CHANNELS"]
    }, interaction)

    if (perms == false) return;

    const channel = interaction.member.voice.channel;
    if (!channel) return client.errNormal({
        error: `You're not in a voice channel!`,
        type: 'editreply'
    }, interaction);

    if (!client.checkVoice(interaction.guild, channel)) return client.errNormal({
        error: `You cannot edit this channel!`,
        type: 'editreply'
    }, interaction);

    client.succNormal({
        text: `The channel was succesfully unlocked!`,
        fields: [
            {
                name: `📘┆Channel`,
                value: `${channel} (${channel.name})`
            }
        ],
        type: 'editreply'
    }, interaction);

    channel.permissionOverwrites.edit(interaction.guild.roles.cache.find(x => x.name === '@everyone'), {
        CONNECT: true
    });
}

 
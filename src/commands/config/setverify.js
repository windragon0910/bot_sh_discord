const Discord = require('discord.js');

const Schema = require("../../database/models/verify");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.Permissions.FLAGS.MANAGE_MESSAGES],
        perms: ["MANAGE_MESSAGES"]
    }, interaction)

    if (perms == false) return;

    const boolean = interaction.options.getBoolean('enable');
    const channel = interaction.options.getChannel('channel');
    const role = interaction.options.getRole('role');

    if (boolean == true) {
        const data = await Schema.findOne({ Guild: interaction.guild.id });
        if (data) {
            data.Channel = channel.id;
            data.Role = role.id
            data.save();
        }
        else {
            new Schema({
                Guild: interaction.guild.id,
                Channel: channel.id,
                Role: role.id
            }).save();
        }

        client.succNormal({
            text: `Verify panel has been successfully created`,
            fields: [
                {
                    name: `📘┆Channel`,
                    value: `${channel} (${channel.name})`,
                    inline: true
                },
                {
                    name: `📛┆Role`,
                    value: `${role} (${role.name})`,
                    inline: true
                }
            ],
            type: 'editreply'
        }, interaction);

        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('Bot_verify')
                    .setEmoji('✅')
                    .setStyle('SUCCESS'),
            );

        client.embed({
            title: `${interaction.guild.name}・verify`,
            desc: `Click on the button to verify yourself`,
            components: [row]
        }, channel)
    }
}

 
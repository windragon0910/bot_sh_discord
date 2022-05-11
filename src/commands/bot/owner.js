const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: `📘・Owner information`,
        desc: `____________________________`,
        thumbnail: client.user.avatarURL({ dynamic: true, size: 1024 }),
        fields: [{
            name: "👑┆Owner name",
            value: `Corwinl`,
            inline: true,
        },
        {
            name: "🏷┆Discord tag",
            value: `</Corwin>#0001`,
            inline: true,
        },
        {
            name: "🏢┆Organization",
            value: `CorwinDev`,
            inline: true,
        },
        {
            name: "🌐┆Website",
            value: `[https://corwindev.nl](https://corwindev.nl)`,
            inline: true,
        }],
        type: 'editreply'
    }, interaction)
}

 
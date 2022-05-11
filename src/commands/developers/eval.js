const Discord = require('discord.js');

const { inspect } = require('util');

module.exports = async (client, interaction, args) => {
    const webhookClientLogs = new Discord.WebhookClient({
        id: client.webhooks.evalLogs.id,
        token: client.webhooks.evalLogs.token,
    });

    let code = interaction.options.getString('code');
    if (code.includes('token') == true) return client.errNormal({ error: "I'm not going to send my token!", type: 'editreply' }, interaction);

    code = code.replace(/[""]/g, '"').replace(/['']/g, "'");
    let evaled;

    try {
        const start = process.hrtime();
        evaled = eval(code);

        if (evaled instanceof Promise) {
            evaled = await evaled;
        }

        const stop = process.hrtime(start);
        const outputResponse = `\`\`\`${inspect(evaled, { depth: 0 })}\n\`\`\``;

        if (outputResponse.length <= 1024) {
            await client.embed({
                title: `💻・Eval`,
                fields: [
                    {
                        name: "📥┇Input",
                        value: `\`\`\`${code}\`\`\``,
                        inline: false,
                    },
                    {
                        name: "📥┇Output",
                        value: outputResponse.substr(0, 1024),
                        inline: false,
                    },
                ],
                type: 'editreply'
            }, interaction)

            const embed2 = new Discord.MessageEmbed()
                .setTitle(`${interaction.user.tag} used eval command`)
                .addField("📥┇Input", `\`\`\`${code}\`\`\``)
                .addField("📤┇Output", outputResponse.substr(0, 1024))
                .setColor(client.config.colors.normal)
                .setTimestamp();
            webhookClientLogs.send({
                username: 'Bot Logs',
                embeds: [embed2],
            });
        }
        else {
            const output = new Discord.MessageAttachment(Buffer.from(outputResponse), 'output.txt');
            var embed2 = new Discord.MessageEmbed()
                .setAuthor(client.user.username, client.user.avatarURL())
                .addField("📥┇Input", `\`\`\`${code}\`\`\``)
                .setColor(client.config.colors.succes)
                .setFooter(client.config.discord.footer)
                .setTimestamp();
            interaction.editreply({ embeds: [embed2] });
            await interaction.channel.send({ files: [output] });
        }
    }
    catch (err) {

        return client.embed({
            title: `💻・Eval`,
            fields: [
                {
                    name: "📥┇Input",
                    value: `\`\`\`${code}\`\`\``,
                    inline: false,
                },
                {
                    name: "📥┇Error!",
                    value: `\`\`\`${clean(err)}\`\`\``,
                    inline: false,
                },
            ],
            type: 'editreply'
        }, interaction)
    }
}

const clean = text => {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

 
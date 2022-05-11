const Discord = require('discord.js');
const pop = require("popcat-wrapper");

module.exports = async (client, interaction, args) => {

    const splitArgs1 = interaction.options.getString('text1');
    const splitArgs2 = interaction.options.getString('text2');

    const image = await pop.pooh(splitArgs1, splitArgs2);
    let attach = new Discord.MessageAttachment(image, "pooh.png");

    interaction.editreply({ files: [attach] })

}

 
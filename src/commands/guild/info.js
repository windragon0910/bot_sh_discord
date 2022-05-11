const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  let verifLevels = {
    "NONE": "None",
    "LOW": "Low",
    "MEDIUM": "Medium",
    "HIGH": "(╯°□°）╯︵  ┻━┻",
    "VERY_HIGH": "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"
  }

  let region = {
    "brazil": `:flag_br: `,
    "eu-central": `:flag_eu: `,
    "singapore": `:flag_sg: `,
    "us-central": `:flag_us: `,
    "sydney": `:flag_au: `,
    "us-east": `:flag_us: `,
    "us-south": `:flag_us: `,
    "us-west": `:flag_us: `,
    "eu-west": `:flag_eu: `,
    "vip-us-east": `:flag_us: `,
    "europe": `:flag_gb:`,
    "amsterdam": `:flag_nl:`,
    "hongkong": `:flag_hk: `,
    "russia": `:flag_ru: `,
    "southafrica": `:flag_za: `
  }

  let tier = {
    "TIER_1": `1`,
    "TIER_2": `2`,
    "TIER_3": `3`,
    "NONE": `0`,
  }

  const members = await interaction.guild.members.fetch();

  client.embed({
    title: `ℹ️・Server Information`,
    desc: `Information about the server ${interaction.guild.name}`,
    thumbnail: interaction.guild.iconURL({ dynamic: true, size: 1024 }),
    image: interaction.guild.bannerURL({ size: 1024 }),
    fields: [
      {
        name: "Server name:",
        value: `${interaction.guild.name}`,
        inline: true,
      },
      {
        name: "Server id:",
        value: `${interaction.guild.id}`,
        inline: true,
      },
      {
        name: "Owner: ",
        value: `<@!${interaction.guild.ownerId}>`,
        inline: true
      },
      {
        name: "Verify level: ",
        value: `${verifLevels[interaction.guild.verificationLevel]}`,
        inline: true
      },
      {
        name: "Boost tier: ",
        value: `Tier ${tier[interaction.guild.premiumTier] || 'None'}`,
        inline: true
      },
      {
        name: "Boost count:",
        value: `${interaction.guild.premiumSubscriptionCount || '0'} boosts`,
        inline: true
      },
      {
        name: "Created on:",
        value: `<t:${Math.round(interaction.guild.createdTimestamp / 1000)}>`,
        inline: true
      },
      {
        name: "Members:",
        value: `${interaction.guild.memberCount} members!`,
        inline: true
      },
      {
        name: "Bots:",
        value: `${members.filter(member => member.user.bot).size} bots!`,
        inline: true
      },
      {
        name: "Text Channels: ",
        value: `${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size} channels!`,
        inline: true
      },
      {
        name: "Voice Channels:",
        value: `${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size} channels!`,
        inline: true
      },
      {
        name: "Stage Channels:",
        value: `${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_STAGE_VOICE').size} channels!`,
        inline: true
      },
      {
        name: "News Channels:",
        value: `${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_NEWS').size} channels!`,
        inline: true
      },
      {
        name: "Public Threads:",
        value: `${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_PUBLIC_THREAD').size} threads!`,
        inline: true
      },
      {
        name: "Private Threads:",
        value: `${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_PRIVATE_THREAD').size} threads!`,
        inline: true
      },
      {
        name: "Roles:",
        value: `${interaction.guild.roles.cache.size} roles!`,
        inline: true
      },
      {
        name: "Emoji count:",
        value: `${interaction.guild.emojis.cache.size} emoji's`,
        inline: true
      },
      {
        name: "Sticker count:",
        value: `${interaction.guild.stickers.cache.size} stickers`,
        inline: true
      }
    ],
    type: 'editreply'
  }, interaction)
}

   
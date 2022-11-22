const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {

    name: "kick",
    description: "Kick users",
    options: [],  

    CommandCreator() {
        const data = new SlashCommandBuilder()
        .setName(this.name)
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDescription(this.description)
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addMentionableOption(option => option.setName("target").setDescription("target to Kick").setRequired(true))
        .addStringOption(option => option.setName("reason").setDescription("Reason to take action").setRequired(true));
      return data.toJSON();
    },

    async run(bot, interaction) {
        interaction.reply("not implemented")
        .catch(err => {
            console.log(err)
            return
        });
    },
}
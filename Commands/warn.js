const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {

    name: "warn",
    description: "Warn users",
    options: [],  

    CommandCreator() {
        const data = new SlashCommandBuilder()
            .setName(this.name)
            .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
            .setDescription(this.description)
            .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
            .addMentionableOption(option => option.setName("target").setDescription("target to warn").setRequired(true))
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
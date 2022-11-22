const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {

	name: "ban",
	description: "Ban users",
	options: [],  

	CommandCreator() {
		const data = new SlashCommandBuilder()
			.setName(this.name)
			.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
			.setDescription(this.description)
			.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
			.addMentionableOption(option => option.setName("target").setDescription("target to Ban").setRequired(true))
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
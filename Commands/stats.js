const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {

    name: "stats",
    description: "Displays your stats",
    options: [],  

    CommandCreator() {
        const data = new SlashCommandBuilder()
        .setName(this.name)
        .setDescription(this.description);
      return data.toJSON();
    },

    async run(bot, interaction) {
        const userEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(interaction.user.tag + " Stats")
        .setDescription('A List of Commands for Dev Pengu')
        .addFields(
            { name: '**XP**', value: '0', inline: true },
            { name: '**Level**', value: '0', inline: true },
        )

        interaction.reply({ embeds: [userEmbed] })
        .catch(err => {
            console.log(err)
            return
        });
    },
}
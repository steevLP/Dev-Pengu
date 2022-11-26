const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {

    name: "help",
    description: "Displays the bots Help page",
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
        .setTitle('Dev Pengu Help')
        .setDescription('A List of Commands for Dev Pengu')
        .addFields(
            { name: '**Help**', value: '`/help`' },
            { name: '**Clear**', value: '`/clear amount`' },
        )

        interaction.reply({ embeds: [userEmbed] })
        .catch(err => {
            console.log(err)
            return
        });
    },
}
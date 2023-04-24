const { SlashCommandBuilder, MessageFlags } = require('@discordjs/core');
const { EmbedBuilder } = require('@discordjs/builders');
const { Colors } = require('discord.js');
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

    async run(bot, interaction, api) {

        const userEmbed = new EmbedBuilder()
            .setTitle('Dev Pengu Help')
            .setDescription('A List of Commands for Dev Pengu')
            .setColor(Colors.Blurple)
            .addFields(
                { name: '**Help**', value: '`/help`' },
                { name: '**Clear**', value: '`/clear amount`' },
            )

        api.interactions.reply(interaction.id, interaction.token, { embeds: [userEmbed] })
        .catch(err => {
            console.log(err)
            return
        });
    },
}
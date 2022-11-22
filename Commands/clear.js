const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {

    name: "clear",
    description: "Bulkdeletes a set Amount of Messages",
    options: [],  

    CommandCreator() {
        const data = new SlashCommandBuilder()
        .setName(this.name)
        .setDescription(this.description)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option => option.setName("amount").setDescription("the amount of messages to remove").setMinValue(1).setRequired(true));
      return data.toJSON();
    },

    async run(bot, interaction) {
        interaction.channel.bulkDelete(interaction.options.getInteger("amount"))
        .then(interaction.channel.send(`Ich habe ${interaction.options.getInteger("amount")} Nachrichten gelöscht!`)
            .then(msg => {
                setTimeout(() => {
                    msg.delete();
                },5000)
            })
        )
        .catch(err => {
            console.log(err)
            return
        });
    },
}
const { EmbedBuilder, SlashCommandBuilder, Client, MessageInteraction,PermissionFlagsBits, ButtonStyle } = require('discord.js');

module.exports = {

    name: "reaction",
    description: "setup command for reaction type messages",
    options: [],  

    CommandCreator() {
        const data = new SlashCommandBuilder()
        .setName(this.name)
        .setDescription(this.description)
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .addStringOption(option => option.setName("type").setDescription("type of action to perform on reaction").setRequired(true).addChoices(
            {name: "Roles", value:"reactionRole"},
            {name: "Voting", value:"voting"},
            {name: "Remove", value:"remove"}
        ))
        .addStringOption(option => option.setName("message").setDescription("The Message ID to assign reactions to").setRequired(true))
        .addStringOption(option => option.setName("emojis").setDescription("Emojis to react with seperated by ','"))
        .addStringOption(option => option.setName("values").setDescription("Values assigned to emojis in order seperated by ','"));
      return data.toJSON();
    },

    /**
     * 
     * @param {Client} bot 
     * @param {MessageInteraction} interaction 
     */
    async run(bot, interaction) {
        var message = interaction.options.getString("message") 
        var type = interaction.options.getString("type") 

        let messages = await interaction.channel.messages.fetch(message);
        //console.log(messages)

        if (type === "remove") {
            // delete all database entries for this message
            messages.reactions.removeAll()
            interaction.reply("cleard message")
        }

        if (type === "voting" || type === "reactionRole") {
            var emojis = interaction.options.getString("emojis").split(",")
            var values = interaction.options.getString("values").split(",")
            console.log(emojis)
            console.log(values)
            console.log(emojis.length === values.length)
        
            emojis.forEach(e => {
                console.log(e)
                messages.react(e)
            });
    
            interaction.reply("reactions set")
        }
    },
}
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rootguide')
        .setDescription('Replies with the root guide.'),
    async execute(interaction) {
        const embed = {
            title: 'Root Guide',
            description: `https://flandolf.site/rootguide`,
            color: 0x4287f5,
        };
        await interaction.reply({ embeds: [embed] , ephemeral: true});
    },
};
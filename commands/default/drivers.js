const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('drivers')
        .setDescription('Provides driver downloads for androids.'),
    async execute(interaction) {
        const embed = {
            title: 'Driver Downloads',
            description: `https://flandolf.site/drivers`,
            color: 0x941ee8,
        };
        await interaction.reply({ embeds: [embed] , ephemeral: true});
    },
};
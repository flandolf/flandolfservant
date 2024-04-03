const { SlashCommandBuilder } = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();
require("colors")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('getwarns')
        .setDescription('Retrieves the warns that a user has.')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('The user to ban.')
                .setRequired(true)
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            return await interaction.reply({ content: 'You do not have permission to warn members.', ephemeral: true });
        } else {
            const user = interaction.options.getMentionable('user');
            let warnings = await db.get(`warnings_${user.id}`) || 0;
            const embed = {
                title: 'User Warned',
                description: `${user.user.username} has ${warnings} warning(s)`,
                color: 0xff0000,
            };
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },
};
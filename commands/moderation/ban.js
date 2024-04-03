const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user.')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('The user to ban.')
                .setRequired(true)
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            return await interaction.reply({ content: 'You do not have permission to ban members.', ephemeral: true });
        } else {
            interaction.options.getMentionable('user').ban({ reason: 'Banned by a moderator.' });
            return await interaction.reply({ content: 'User has been banned.', ephemeral: true });
        }
    },
};
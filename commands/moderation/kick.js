const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a user.')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('The user to ban.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for the kick.')
                .setRequired(false)
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            return await interaction.reply({ content: 'You do not have permission to kick members.', ephemeral: true });
        } else {
            const user = interaction.options.getMentionable('user');
            const reason = interaction.options.getString('reason') || 'Kicked by a moderator.';
            user.kick(reason);
            const embed = {
                title: 'User Kicked',
                description: `${user.username} has been kicked for ${reason}.`,
                color: 0xff0000,
            };
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },
};
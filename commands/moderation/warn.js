const { SlashCommandBuilder } = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();
require("colors")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warns a user.')
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
            return await interaction.reply({ content: 'You do not have permission to warn members.', ephemeral: true });
        } else {
            const user = interaction.options.getMentionable('user');
            console.log("[WARN] " + user.id + "/" + user.user.username + " has been warned. Reason: " + interaction.options.getString('reason') || 'Warned by a moderator.'.red);
            const reason = interaction.options.getString('reason') || 'Warned by a moderator.';
            let warnings = await db.get(`warnings_${user.id}`) || 0;
            warnings++;
            await db.set(`warnings_${user.id}`, warnings);
            const embed = {
                title: 'User Warned',
                description: `${user.user.username} has been warned for ${reason}. They now have ${warnings} warning(s).`,
                color: 0xff0000,
            };
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },
};
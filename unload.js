const { REST, Routes } = require('discord.js');
const { configDotenv } = require("dotenv");
const fs = require('node:fs');
const path = require('node:path');
configDotenv();
const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DEV_SERVER_ID;
const token = process.env.DISCORD_BOT_TOKEN;
const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`[INFO] Started unloading all application (/) commands.`)

        const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: [] },
        );

        console.log(`[INFO] Successfully unloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();

(async () => {
    try {
        console.log(`[INFO] Started unloading all guild (/) commands.`)

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: [] },
        );

        console.log(`[INFO] Successfully unloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();
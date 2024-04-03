const { REST, Routes } = require('discord.js');
const { configDotenv } = require("dotenv");
const fs = require('node:fs');
const path = require('node:path');
configDotenv();
const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DEV_SERVER_ID;
const token = process.env.DISCORD_BOT_TOKEN;

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
console.log(foldersPath)
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath);
    console.log(commandFiles)
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const commandFileStat = fs.statSync(filePath);

        if (!commandFileStat.isDirectory() && file.endsWith('.js')) {
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                commands.push(command.data.toJSON());
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        } else {
            console.log(`[WARNING] The file at ${filePath} is not a JavaScript file.`);
        
        }
    }
}


const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();

// (async () => {
//     try {
//         console.log(`[INFO] Started refreshing ${commands.length} guild (/) commands.`);

//         const data = await rest.put(
//             Routes.applicationGuildCommands(clientId, guildId),
//             { body: commands },
//         );

//         console.log(`Successfully reloaded ${data.length} application (/) commands.`);
//     } catch (error) {
//         console.error(error);
//     }
// })();
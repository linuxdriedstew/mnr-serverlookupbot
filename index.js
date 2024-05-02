const Discord = require('discord.js') 

import { Client, Events, EmbedBuilder, REST, SlashCommandBuilder, Routes, GatewayIntentBits, AttachmentBuilder }  from 'discord.js';

import mc from "minecraftstatuspinger"   
 
const client = new Client({intents: [GatewayIntentBits.Guilds]});
client.once("ready", c => {
        console.log(`Ready! Logged in as ${c.user.tag}`);
    });
    //selected server
    const rest = new REST({ version: "10" }).setToken(process.env.token)
    let commands = [
            new SlashCommandBuilder().setName("ping").setDescription("Pings a Minecraft server.")
                .addStringOption(option =>
                    option.setName("ip")
                        .setDescription("IP of server.")
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName("port")
                        .setDescription("Port of server.")
                        .setRequired(false)
                        .setMinValue(0)
                        .setMaxValue(65535)
                )
        ].map(command => command.toJSON())
       await rest.put(Routes.applicationCommands("app ID"), { body: commands })
    
       client.on(Events.InteractionCreate, (interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;
        const { commandName } = interaction;
        if (commandName === 'ping') return getMcStatus(interaction);
    });
    //ping-sever
    async function getMcStatus(interaction){
        let IP = interaction.options.getString("ip")
        let port = interaction.options.getInteger("port") || 25565
    
        let result = await mc.lookup({ hostname: IP, port: port }) 
    }
    
    async function getMcStatus(interaction){
        let IP = interaction.options.getString("ip")
        let port = interaction.options.getInteger("port") || 25565
    
        let result = await mc.lookup({ hostname: IP, port: port })
    
        let buf = Buffer.from(result.status.favicon.replace(/data:image\/[^;]+;base64,/, ""), "base64")
        let attach = await new AttachmentBuilder(buf)
        .setName("icon.png")
        
        let motdEmbed = new EmbedBuilder()
            .setTitle(`Status of ${IP}`)
            .setDescription(result.status.description?.text || result.status.description) // MOTD
            .addFields(
                {name: "Players:", value: `${result.status.players.online}/${result.status.players.max}`},
                {name: "Version:", value: result.status.version.name}
            .setThumbnail("attachment://icon.png")
            .setColor("DarkGreen")
        )
    
        interaction.reply({ embeds: [ motdEmbed ], files: [ attach ] })
    }
    


//ADD DISCORD BOT ID HERE
client.login(############)

// Dependencies
const	Command = require('../../structures/Command.js');
const { Embed } = require('../../utils')
const os = require('os');
const si = require('systeminformation');
/**
 * CustomCommand command
 * @extends {Command}
*/
class sinfo extends Command {
	/**
 	 * @param {Client} client The instantiating client
 	 * @param {CommandData} data The data for the command
	*/
	constructor(bot) {
		// MORE COMMAND SETTINGS CAN BE FOUND IN src/structures/Command
		super(bot, {
			name: 'sinfo',
			guildOnly: true,
			dirname: __dirname,
		aliases: ['sysinfo', 'sinfo'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Displays System Information.',
			usage: 'sinfo',
			cooldown: 2000,
			examples: ['sinfo'],
			// set to false if u don't want it a slash command VV
			slash: false,
			
		});
	}

	/**
 	 * Function for recieving message.
 	 * @param {bot} bot The instantiating client
 	 * @param {message} message The message that ran the command
	 * @param {settings} settings The settings of the channel the command ran in
 	 * @readonly
	*/
	async run(bot, message, settings) {
		function prettyBytes(bytes) {
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes === 0) return 'n/a';
            var by = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            if (by === 0) return `${bytes} ${sizes[by]}`;
            return `${(bytes / Math.pow(1024, by)).toFixed(1)} ${sizes[by]}`;
        };
        const totalram = prettyBytes(os.totalmem());
        const freeram = prettyBytes(os.freemem());
        const usedram = prettyBytes(os.totalmem() - os.freemem());
        const prctfreeram = (((os.freemem() * 100) / os.totalmem + " ").split('.')[0]);
		
		var seconds = Math.floor(os.uptime);
		var minutes = Math.floor(seconds/60); seconds %= 60
		var hours = Math.floor(minutes/60); minutes %= 60
		var days = Math.floor(hours/24); hours %= 24;
        const embed = new Embed(bot, message.guild)
            .setColor('RANDOM')
            .setTitle("Statistics")
            .setDescription("Stats of the System")
            .addFields(
                { name: 'Memory (RAM)', value: `Total Memory: ${totalram}\nUsed Memory: ${usedram}\nFree Memory: ${freeram}\nPercentage Of Free Memory: ${prctfreeram}%`, inline: true}, 
                { name: 'CPU', value: os.cpus()[0].model, inline: true}, 
				///{ name: 'Distro', value: si.osInfo(), inline: false},
                { name: 'OS', value: os.version(), inline: true},
                { name: 'OS Release', value: os.release(), inline: true},
                { name: 'Uptime', value: `${days} days | ${hours} hours | ${minutes} minutes| ${seconds} seconds`, inline: true},
                { name: 'CPU Load', value: os.loadavg().map(i => `${i}`).join(','), inline: true},
				)
            
 
        message.channel.send({ embeds: [embed] });
    } 
	

	/**
	 * Function for recieving interaction.
	 * @param {bot} bot The instantiating client
	 * @param {interaction} interaction The interaction that ran the command
	 * @param {guild} guild The guild the interaction ran in
	 * @readonly
	*/
	
}

module.exports = sinfo;
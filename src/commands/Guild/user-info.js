/* eslint-disable no-undef */
// Dependencies
const { Embed } = require('../../utils'),
	moment = require('moment'),
	Command = require('../../structures/Command.js');


/**
 * User-info command
 * @extends {Command}
*/
class UserInfo extends Command {
	/**
   * @param {Client} client The instantiating client
   * @param {CommandData} data The data for the command
  */
	constructor(bot) {
		super(bot, {
			name:  'user-info',
			guildOnly: true,
			dirname: __dirname,
			aliases: ['userinfo', 'whois'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Get information on a user.',
			usage: 'user-info [user]',
			cooldown: 2000,
			examples: ['user-info userID', 'user-info @mention', 'user-info username'],
			slash: true,
			options: [{
				name: 'user',
				description: 'The user you want to get information of',
				type: 'USER',
				required: false,
			}],
		});
	}

	/**
	 * Function for recieving message.
	 * @param {bot} bot The instantiating client
 	 * @param {message} message The message that ran the command.
 	 * @readonly
	*/
	async run(bot, message) {
		// Get user
		const members = await message.getMember();
		const embed = this.createEmbed(bot, message.guild, members[0]);

		// send user info
		message.channel.send({ embeds: [embed] });
	}


	/**
 	 * Function for recieving interaction.
 	 * @param {bot} bot The instantiating client
 	 * @param {interaction} interaction The interaction that ran the command
 	 * @param {guild} guild The guild the interaction ran in
	 * @param {args} args The options provided in the command, if any
 	 * @readonly
	*/
	async callback(bot, interaction, guild, args) {
		const member = guild.members.cache.get(args.get('user')?.value ?? interaction.user.id);


		// send embed
		const embed = await this.createEmbed(bot, guild, member);


		interaction.reply({ embeds: [embed] });
	}

	const acknowledgments = getAcks(ids) ; 
		let teamAcks = [];
		const owners = ['105419972309741568', '292532134877462529'];
		const DiscordManager = ['882219448373772319', '504510509106724867'];
		const CommunityManager = ['189113141836120064'];
		const Administrators = ['215853754828718080', '114884883742064644', '170967044391567361', '142824509613932544', '105419972309741568'];
		const Moderators = ['396062087907901441', '258098010209255424', '154099133949411328', '275766959478407168', '188008446921015307', '148141365853814785', '232917170483363840'];
		const LegacyStaff = ['89695287366414336', '129172043987025921', '106048100002439168', '169896575336710144', '324646179134636043'];
		const Contributors = ['263895063573037057'];
		const Developers = ['105419972309741568'];
		// rest of your arrays goes here

		if (owners.includes(id)) teamAcks.push('Owners');
		if (DiscordManager.includes(id)) teamAcks.push('Discord Managers');
		if (CommunityManager.includes(id)) teamAcks.push('Community Managers');
		if (Administrators.includes(id)) teamAcks.push('Administrators');
		if (Moderators.includes(id)) teamAcks.push('Moderators');
		if (LegacyStaff.includes(id)) teamAcks.push('Legacy Staff');
		if (Contributors.includes(id)) teamAcks.push('Contributors');
		if (Developers.includes(id)) teamAcks.push('Developers');
		// rest of your if statements go here

		return teamAcks;
	

	/**
	 * Function for recieving slash command.
	 * @param {bot} bot The instantiating client
	 * @param {interaction} interaction The interaction that ran the command
	 * @param {guild} guild The guild the interaction ran in
	 * @param {args} args The options provided in the command, if any
	 * @readonly
	*/
	reply(bot, interaction, channel) {


		const embed = this.createEmbed(bot, channel.guild, member);

		// send embed
		return interaction.reply({ embeds: [embed] });
	}


	/**
	 * Function for creating embed of user information
	 * @param {bot} bot The instantiating client
	 * @param {guild} Guild The guild the command was ran in
	 * @param {user} GuildMember The member to get information of
	 * @returns {embed}
	*/
	createEmbed(bot, guild, member) {
		const status = (member.presence?.activities.length >= 1) ? `${member.presence.activities[0].name} - ${(member.presence.activities[0].type == 'CUSTOM_STATUS') ? member.presence.activities[0].state : member.presence.activities[0].details}` : 'None';
		return new Embed(bot, guild)
			.setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL() })
			.setColor(bot.config.embedColor)
			.setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 512 }))
			.addFields(
				{ name: guild.translate('guild/user-info:USERNAME'), value: member.user.username, inline: true },
				{ name: guild.translate('guild/user-info:DISCRIM'), value: `${member.user.discriminator}`, inline: true },
				{ name: guild.translate('guild/user-info:ROBOT'), value: guild.translate(`misc:${member.user.bot ? 'YES' : 'NO'}`), inline: true },
				{ name: guild.translate('guild/user-info:CREATE'), value: moment(member.user.createdAt).format('lll'), inline: true },
				{ name: guild.translate('guild/user-info:STATUS'), value: `\`${status}\``, inline: true },
				{ name: guild.translate('guild/user-info:ROLE'), value: `${member.roles.highest}`, inline: true },
				{ name: ('Staff Team'), value: acknowledgment.length > 0 ? acknowledgement.join(", ") : "None", inline: true },
				{ name: guild.translate('guild/user-info:JOIN'), value: moment(member.joinedAt).format('lll'), inline: true },
				{ name: guild.translate('guild/user-info:NICK'), value: member.nickname != null ? member.nickname : guild.translate('misc:NONE'), inline: true },
				{ name: guild.translate('guild/user-info:ROLES'), value: member.roles.cache.sort((a, b) => b.rawPosition - a.rawPosition).reduce((a, b) => `${a}, ${b}`) },
			);
	}
}

module.exports = UserInfo;


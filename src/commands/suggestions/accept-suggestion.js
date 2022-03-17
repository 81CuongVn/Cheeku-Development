const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "accept-suggestion",
  description: "accept a suggestion",
  aliases: ["acc-suggest", "acc-sug"],
  permissions: ["MANAGE_MESSAGES"],
  run: async ({ client, message, args }) => {
    const messageID = args[0];
    const reason = args.slice(1).join(" ") || "No reason given";
    const suggestionChannel =
      message.guild.channels.cache.get("953482520542978141");
    const suggestedMsg = await suggestionChannel.messages.fetch(messageID);
    const suggestEmbed = suggestedMsg.embeds[0];

    if (!messageID) return message.reply("Please provide a message ID");

    let acceptedEmbed = new MessageEmbed()
      .setAuthor({
        name: suggestEmbed.author.name,
        iconURL: suggestEmbed.author.iconURL,
      })

      .setTitle(suggestEmbed.title)
      .setDescription(suggestEmbed.description)
      .setColor("GREEN")
      .addField(
        "Status",
        `🟢 Nice idea! We're working on it!\n\n**Reason:** ${reason}`
      )
      .setFooter({
        text: `accepted by: ${message.author.tag}`,
        iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`,
      });
    try {
        suggestedMsg.edit({ embeds: [acceptedEmbed] });
    await message.reply("Suggestion accepted!");
    } catch(err) {
        console.log(err);
        await message.reply(`\`\`\`${err}\`\`\``);
    }
    
  },
};

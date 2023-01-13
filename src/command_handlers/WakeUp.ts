import Command from "../Command";
import { ApplicationCommandOptionType, ChannelType, Client, CommandInteraction, User, VoiceChannel } from "discord.js";

export const WakeUp: Command = {
  name: "wakeup",
  description: "Wakes up a deafened user.",
  options: [
    {
      type: ApplicationCommandOptionType.User,
      name: "user",
      description: "The name of the user you want to wake up.",
      required: true,
    },
    {
      type: ApplicationCommandOptionType.Channel,
      name: "channel1",
      description: "The name of the user you want to wake up.",
      required: true,
    },
    {
      type: ApplicationCommandOptionType.Channel,
      name: "channel2",
      description: "The name of the user you want to wake up.",
      required: true,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    let content = "Hello, World!";
    const guild = await interaction.guild?.fetch();

    if (!guild) {
      await interaction.followUp({
        ephemeral: true,
        content: "No guild found!",
      });
      return;
    }

    const user = interaction.options.get("user")?.user;

    if (!user || user === null) {
      await interaction.followUp({
        ephemeral: true,
        content: "No user found!",
      });
      return;
    }

    const guild_member = await interaction.guild?.members.fetch(user);

    if (!guild_member || guild_member === null) {
      await interaction.followUp({
        ephemeral: true,
        content: "No guild member found!",
      });
      return;
    }

    const first_channel = interaction.options.get("channel1")?.channel;
    const second_channel = interaction.options.get("channel2")?.channel;
    if (!first_channel || first_channel === null || first_channel.type !== ChannelType.GuildVoice) {
      await interaction.followUp({
        ephemeral: true,
        content: "Invalid Channel2!",
      });
      return;
    }
    if (!second_channel || second_channel === null || second_channel.type !== ChannelType.GuildVoice) {
      await interaction.followUp({
        ephemeral: true,
        content: "Invalid Channel2!",
      });
      return;
    }

    await interaction.followUp({
      content: `Waking up ${user.tag}.`,
    });

    try {
      for (let i = 0; i < 10; i++) {
        if (i % 2 == 0) {
          await guild_member.voice.setChannel(first_channel.id, `Wake up requested by: ${interaction.user.tag}`);
        } else {
          await guild_member.voice.setChannel(second_channel.id, `Wake up requested by: ${interaction.user.tag}`);
        }
      }

      await guild_member.voice.setChannel(first_channel.id, `Wake up requested by: ${interaction.user.tag}`);
    }
    catch (ex) {
      await interaction.followUp({
        content: "Wake up failed!",
      });
      return;
    }

    await interaction.followUp({
      content: "Wake up completed!",
    });
  },
};

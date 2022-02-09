import { Message, MessageEmbed } from "discord.js";
import { injectable } from "tsyringe";

interface AlertCommandViewDTO {
  status: "start" | "stop";
  message: Message;
}

@injectable()
export class AlertCommandView {
  public render({ message, status }: AlertCommandViewDTO) {
    return {
      embeds: [
        new MessageEmbed({
          color: status === "start" ? 0x00ff00 : 0xff0000,
          title: `Agendamento de avisos foi ${
            status === "start" ? "iniciado" : "cancelado"
          } com sucesso`,
        }),
      ],
    };
  }
}

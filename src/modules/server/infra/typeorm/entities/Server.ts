import { v4 as uuid } from "uuid";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "@/modules/user/infra/typeorm/entities/User";
import { botConfig } from "@/config/botConfig";

@Entity("servers")
export class Server {
  @PrimaryColumn({ type: "uuid" })
  public readonly id: string;

  @Column({ unique: true })
  public idDiscord: string;

  @Column()
  public name: string;

  @Column()
  public prefix: string;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;

  @ManyToMany(() => User, ({ servers }) => servers, {
    cascade: ["insert", "update", "remove"],
  })
  @JoinTable({
    name: "servers_users",
    joinColumn: { name: "server_id" },
    inverseJoinColumn: { name: "user_id" },
  })
  public users?: User[];

  constructor(
    props: Omit<Server, "id" | "created_at" | "updated_at" | "prefix">
  ) {
    Object.assign(this, props);

    if (!this.id) {
      this.id = uuid();
    }

    if (!this.prefix) {
      this.prefix = botConfig.prefix;
    }
  }
}

export type ServerAttributes = Omit<
  Server,
  "id" | "created_at" | "updated_at" | "prefix" | "users"
>;

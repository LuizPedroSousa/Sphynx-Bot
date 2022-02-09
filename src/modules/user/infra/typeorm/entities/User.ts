import { Server } from "../../../../server/infra/typeorm/entities/Server";
import { v4 as uuid } from "uuid";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryColumn({ type: "uuid" })
  public readonly id: string;

  @Column()
  public idDiscord: string;

  @Column()
  public avatar_url: string;

  @Column({ nullable: true, unique: true })
  public email?: string;

  @Column()
  public name: string;

  @Column()
  public discriminator: string;

  @Column({ nullable: true })
  public system?: boolean = false;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;

  @ManyToMany(() => Server, ({ users }) => users)
  public servers: Server[];

  constructor(props: Omit<User, "id" | "created_at" | "updated_at">) {
    Object.assign(this, props);

    if (!this.id) {
      this.id = uuid();
    }
  }
}

export type UserAttributes = Omit<
  User,
  "id" | "created_at" | "updated_at" | "system"
>;

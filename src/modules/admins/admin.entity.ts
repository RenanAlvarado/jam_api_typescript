import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "admins" })
class Admin {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 150, unique: true, nullable: false })
  email!: string;

  @Column({
    type: "varchar",
    length: 255,
    name: "password_hash",
    nullable: false,
  })
  password_hash!: string;

  @CreateDateColumn({ name: "created_at", type: "datetime" })
  created_at!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "datetime" })
  updated_at!: Date;
}

export default Admin;

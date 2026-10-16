import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "addresses" })
export default class Address {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  place_name!: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  street!: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  number!: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  district!: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  city!: string;

  @Column({
    type: "varchar",
    length: 2,
    nullable: false,
  })
  state!: string;

  @Column({
    type: "varchar",
    length: 8,
    nullable: false,
  })
  zip_code!: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  complement!: string | null;

  @Column({
    type: "text",
    nullable: false,
  })
  maps_url!: string;

  @CreateDateColumn({
    name: "created_at",
    type: "datetime",
    nullable: false,
  })
  created_at!: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "datetime",
    nullable: false,
  })
  updated_at!: Date;
}

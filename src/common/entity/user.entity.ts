import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, JoinTable, ManyToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "./role.entity";

@Entity('users')
export class User extends BaseEntity {
    @ApiProperty({ readOnly: true })
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @ApiProperty({ readOnly: true })
    @CreateDateColumn()
    createdAt: Date;
  
    @ApiProperty({ readOnly: true })
    @UpdateDateColumn()
    updatedAt: Date;
  
    @ApiProperty({ readOnly: true })
    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;

    // Relations
    @ManyToOne(() => Role)
    role: Role
}
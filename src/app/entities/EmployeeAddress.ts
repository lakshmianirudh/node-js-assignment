

import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./abstractentity";

@Entity("employeeaddress")
export class EmployeeAddress extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ nullable: false })
    public state: string;

    @Column({ nullable: false })
    public district: string;

    
}
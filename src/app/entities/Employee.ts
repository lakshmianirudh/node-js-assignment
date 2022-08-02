import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstractentity";
import { Department } from "./Department";

@Entity("employee")
    export class Employee extends AbstractEntity{
        @PrimaryGeneratedColumn("uuid")
        public id: string;
        @Column({ nullable: false })
        public name: string;
        
        @ManyToOne(() => Department, { cascade: true })
        @JoinColumn()
        public department: Department;

        @Column({ nullable: false })
        public departmentId: string;

        @Column({ nullable: true })
        public role: string;
        @Column({ nullable: false })
        public joiningDate: string;
        
        @Column({ nullable: false })
        public status: string;

        @Column({ nullable: true })
        public password: string;

        
}
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { AbstractEntity } from "./abstractentity";
import { Department } from "./Department";
import { EmployeeAddress } from "./EmployeeAddress";

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

        @Column({ nullable: true })
        public username: string;
        
        @OneToOne(() => EmployeeAddress, { cascade: true, onUpdate: 'CASCADE' })
        @JoinColumn()
        public employeeaddress: EmployeeAddress;
    
        

        
}
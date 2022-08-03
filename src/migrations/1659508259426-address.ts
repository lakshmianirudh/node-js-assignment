import {MigrationInterface, QueryRunner} from "typeorm";

export class address1659508259426 implements MigrationInterface {
    name = 'address1659508259426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employeeaddress" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "state" character varying NOT NULL, "district" character varying NOT NULL, CONSTRAINT "PK_42ad9c0eb4a96c721afaf7487d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "username" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "employeeaddress_id" uuid`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_0473e84dc9444d9aadd3c33e707" UNIQUE ("employeeaddress_id")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_0473e84dc9444d9aadd3c33e707" FOREIGN KEY ("employeeaddress_id") REFERENCES "employeeaddress"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_0473e84dc9444d9aadd3c33e707"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_0473e84dc9444d9aadd3c33e707"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employeeaddress_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "username"`);
        await queryRunner.query(`DROP TABLE "employeeaddress"`);
    }

}

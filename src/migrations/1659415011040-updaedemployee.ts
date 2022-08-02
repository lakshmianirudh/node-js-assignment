import {MigrationInterface, QueryRunner} from "typeorm";

export class updaedemployee1659415011040 implements MigrationInterface {
    name = 'updaedemployee1659415011040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "joining_date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "joining_date"`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class passwordadded1659441664162 implements MigrationInterface {
    name = 'passwordadded1659441664162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
    }

}

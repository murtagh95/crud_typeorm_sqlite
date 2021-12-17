import {MigrationInterface, QueryRunner} from "typeorm";

export class correctAppointments1638495918658 implements MigrationInterface {
    name = 'correctAppointments1638495918658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`db\`.\`appointments\` DROP FOREIGN KEY \`FK_6b05d1271f4bd9b41403b5a93e5\``);
        await queryRunner.query(`ALTER TABLE \`db\`.\`appointments\` CHANGE \`Appointments_fk_id\` \`user_fk_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`db\`.\`appointments\` DROP COLUMN \`user_fk_id\``);
        await queryRunner.query(`ALTER TABLE \`db\`.\`appointments\` ADD \`user_fk_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`db\`.\`appointments\` ADD CONSTRAINT \`FK_cca7a209d5aefd97bad1116fb61\` FOREIGN KEY (\`user_fk_id\`) REFERENCES \`db\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`db\`.\`appointments\` DROP FOREIGN KEY \`FK_cca7a209d5aefd97bad1116fb61\``);
        await queryRunner.query(`ALTER TABLE \`db\`.\`appointments\` DROP COLUMN \`user_fk_id\``);
        await queryRunner.query(`ALTER TABLE \`db\`.\`appointments\` ADD \`user_fk_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`db\`.\`appointments\` CHANGE \`user_fk_id\` \`Appointments_fk_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`db\`.\`appointments\` ADD CONSTRAINT \`FK_6b05d1271f4bd9b41403b5a93e5\` FOREIGN KEY (\`Appointments_fk_id\`) REFERENCES \`db\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

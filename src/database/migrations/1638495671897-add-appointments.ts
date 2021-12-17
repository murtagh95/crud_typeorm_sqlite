import {MigrationInterface, QueryRunner} from "typeorm";

export class addAppointments1638495671897 implements MigrationInterface {
    name = 'addAppointments1638495671897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`db\`.\`appointments\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`detail\` varchar(255) NOT NULL, \`date\` datetime NOT NULL, \`Appointments_fk_id\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`db\`.\`appointments_products_product\` (\`appointmentsId\` varchar(255) NOT NULL, \`productId\` varchar(255) NOT NULL, INDEX \`IDX_96e13d6df68d97845ba17d2d3f\` (\`appointmentsId\`), INDEX \`IDX_31349f74b676b220f45f14901e\` (\`productId\`), PRIMARY KEY (\`appointmentsId\`, \`productId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`db\`.\`appointments\` ADD CONSTRAINT \`FK_6b05d1271f4bd9b41403b5a93e5\` FOREIGN KEY (\`Appointments_fk_id\`) REFERENCES \`db\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`db\`.\`appointments_products_product\` ADD CONSTRAINT \`FK_96e13d6df68d97845ba17d2d3fb\` FOREIGN KEY (\`appointmentsId\`) REFERENCES \`db\`.\`appointments\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`db\`.\`appointments_products_product\` ADD CONSTRAINT \`FK_31349f74b676b220f45f14901e4\` FOREIGN KEY (\`productId\`) REFERENCES \`db\`.\`product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`db\`.\`appointments_products_product\` DROP FOREIGN KEY \`FK_31349f74b676b220f45f14901e4\``);
        await queryRunner.query(`ALTER TABLE \`db\`.\`appointments_products_product\` DROP FOREIGN KEY \`FK_96e13d6df68d97845ba17d2d3fb\``);
        await queryRunner.query(`ALTER TABLE \`db\`.\`appointments\` DROP FOREIGN KEY \`FK_6b05d1271f4bd9b41403b5a93e5\``);
        await queryRunner.query(`DROP INDEX \`IDX_31349f74b676b220f45f14901e\` ON \`db\`.\`appointments_products_product\``);
        await queryRunner.query(`DROP INDEX \`IDX_96e13d6df68d97845ba17d2d3f\` ON \`db\`.\`appointments_products_product\``);
        await queryRunner.query(`DROP TABLE \`db\`.\`appointments_products_product\``);
        await queryRunner.query(`DROP TABLE \`db\`.\`appointments\``);
    }

}

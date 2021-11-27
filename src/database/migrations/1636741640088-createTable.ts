import {MigrationInterface, QueryRunner} from "typeorm";

export class createTable1636741640088 implements MigrationInterface {
    name = 'createTable1636741640088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`db\`.\`imageProduct\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`product_fk_id\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`db\`.\`product\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`price\` double NOT NULL, \`type\` varchar(1) NOT NULL, \`category_fk_id\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`db\`.\`category\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`db\`.\`users\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`name\` varchar(255) NULL, \`lastname\` varchar(255) NULL, \`gender\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`city\` varchar(255) NULL, \`state\` varchar(255) NULL, \`is_admin\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`db\`.\`imageProduct\` ADD CONSTRAINT \`FK_952bf92c747ec7c0965050ab77d\` FOREIGN KEY (\`product_fk_id\`) REFERENCES \`db\`.\`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`db\`.\`product\` ADD CONSTRAINT \`FK_aa68e9199b707d3025ae773b5be\` FOREIGN KEY (\`category_fk_id\`) REFERENCES \`db\`.\`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`db\`.\`product\` DROP FOREIGN KEY \`FK_aa68e9199b707d3025ae773b5be\``);
        await queryRunner.query(`ALTER TABLE \`db\`.\`imageProduct\` DROP FOREIGN KEY \`FK_952bf92c747ec7c0965050ab77d\``);
        await queryRunner.query(`DROP TABLE \`db\`.\`users\``);
        await queryRunner.query(`DROP TABLE \`db\`.\`category\``);
        await queryRunner.query(`DROP TABLE \`db\`.\`product\``);
        await queryRunner.query(`DROP TABLE \`db\`.\`imageProduct\``);
    }

}

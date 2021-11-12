import {MigrationInterface, QueryRunner} from "typeorm";

export class ImageProduct1636734857401 implements MigrationInterface {
    name = 'ImageProduct1636734857401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`db\`.\`imageProduct\` ADD \`productId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`db\`.\`imageProduct\` ADD CONSTRAINT \`FK_9537ce066328b3798d26dd169c5\` FOREIGN KEY (\`productId\`) REFERENCES \`db\`.\`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`db\`.\`imageProduct\` DROP FOREIGN KEY \`FK_9537ce066328b3798d26dd169c5\``);
        await queryRunner.query(`ALTER TABLE \`db\`.\`imageProduct\` DROP COLUMN \`productId\``);
    }

}

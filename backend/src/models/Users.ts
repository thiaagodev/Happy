import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import bcrypt from 'bcrypt';

@Entity('users')
export default class {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column( {unique: true} )
    email: string;

    @Column()
    password: string;

    async generatePasswordHash() {
        this.password = await bcrypt.hash(this.password, 8);
    }

    @BeforeInsert()
    beforeInsert() {
        this.generatePasswordHash();
    }

    @BeforeUpdate()
    beforeUpdate() {
        this.generatePasswordHash();
    }
   
}
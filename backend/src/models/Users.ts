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

    @Column()
    password_reset_token: string;

    @Column();
    password_reset_expires: string;

    @BeforeInsert()
    async beforeInsert() {
        this.password = await bcrypt.hash(this.password, 8);
    }

    @BeforeUpdate()
    async beforeUpdate() {
        this.password = await bcrypt.hash(this.password, 8);
    }
   
}
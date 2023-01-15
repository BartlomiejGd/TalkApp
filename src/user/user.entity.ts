import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    pwdHash: string;

    @Column({ nullable: true, default: null })
    currentTokenID: string | null;

    @Column({default: false})
    isActivated: boolean;

    @Column({default: ()=> 'CURRENT_TIMESTAMP'})
    createAtTimestamp: string;
}
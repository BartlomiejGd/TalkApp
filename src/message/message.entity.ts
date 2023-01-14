import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class MessagesBase{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    messageFrom: string;

    @Column()
    messageTo: string;

    @Column()
    messagePayload: string;

    @Column({default: ()=> 'CURRENT_TIMESTAMP'})
    messageTimestamp: string;


}
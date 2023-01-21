import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Connections{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    //relationship
    @Column()
    sendFrom: string;

    //relationship
    @Column()
    sendTo: string;

    @Column({default: false})
    isAccepted: boolean;

    @Column({default: ()=> 'CURRENT_TIMESTAMP'})
    createdAt: string;
}
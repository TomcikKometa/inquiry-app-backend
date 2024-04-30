import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

Entity()
export class ShortTextQuestion {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    answer:string;
}
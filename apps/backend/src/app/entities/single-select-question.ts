import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SingleSelectAnswer } from "./single-select-answer";


@Entity()
export class SingleSelectQuestion{
    @PrimaryGeneratedColumn()
    id:number;

    @OneToMany(()=>SingleSelectAnswer,singleSelectAnswer=>singleSelectAnswer.question,{eager:true})
    public answers:SingleSelectAnswer[];
}



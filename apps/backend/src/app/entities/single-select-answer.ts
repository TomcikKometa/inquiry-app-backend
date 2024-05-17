import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SingleSelectQuestion } from "./single-select-question";


@Entity()
export class SingleSelectAnswer{
    @PrimaryGeneratedColumn()
    public id:number;
    
    @Column()
    public answer:string;

    @ManyToOne(()=>SingleSelectQuestion,singleSelectQuestion=>singleSelectQuestion.answers)
    public question:SingleSelectQuestion;

    public constructor(answer: string) {
        this.answer = answer;
      }
    
}
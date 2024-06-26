import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Inquiry } from "./inquiry";
import { ShortTextQuestion } from "./short-text-question";
import { MultiSelectQuestion } from "./multi-select-question";
import { SingleSelectQuestion } from "./single-select-question";
import { ScaleQuestion } from "./scale-question";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    questionType:string;

    @Column()
    label:string;

    @OneToOne(()=>ShortTextQuestion,{eager:true})
    @JoinColumn()
    shortTextQuestion:ShortTextQuestion;

    @OneToOne(()=>MultiSelectQuestion,{eager:true})
    @JoinColumn()
    multiSelectQuestion:MultiSelectQuestion;

    @OneToOne(()=>SingleSelectQuestion,{eager:true})
    @JoinColumn()
    singleSelectQuestion:SingleSelectQuestion;

    @OneToOne(()=> ScaleQuestion,{eager:true})
    @JoinColumn()
    scaleQuestion:ScaleQuestion

    @ManyToOne(()=>Inquiry,inquiry=>inquiry.questions,{onDelete:"CASCADE",cascade:true,onUpdate:'CASCADE'})
    inquiry:Inquiry;
}
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuestionType } from "./enums/question-type";
import { Inquiry } from "./inquiry";
import { ShortTextQuestion } from "./short-text-question";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    questionType:string;

    @Column()
    label:string;

    @OneToOne(()=>ShortTextQuestion)
    @JoinColumn()
    shortTextQuestion:ShortTextQuestion;

    @ManyToOne(()=>Inquiry,inquiry=>inquiry.questions,{onDelete:"CASCADE"})
    inquiry:Inquiry;

    constructor(questionType:QuestionType,label:string,inquiry:Inquiry){
        this.questionType = questionType;
        this.label = label;
        this.inquiry  = inquiry;
    }
}
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuestionType } from "./enums/question-type";
import { Inquiry } from "./inquiry";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    questionType:string;

    @Column()
    label:string;

    @ManyToOne(()=>Inquiry,inquiry=>inquiry.questions)
    inquiry:Inquiry

    constructor(questionType:QuestionType,label:string,inquiry:Inquiry){
        this.questionType = questionType;
        this.label = label;
        this.inquiry  = inquiry
    }
}
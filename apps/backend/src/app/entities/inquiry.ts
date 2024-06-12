import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question';

@Entity()
export class Inquiry {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  Name:string

  @OneToMany(()=> Question, question =>question.inquiry,{eager:true,orphanedRowAction:'delete'})
  questions:Question[];
}

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MultiSelectQuestion } from './multi-select-question';

@Entity()
export class MultiSelectAnswer {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public answer: string;

  @ManyToOne(
    () => MultiSelectQuestion,(multiSelectQuestion) => multiSelectQuestion.answers)
  public multiSelectQuestion: MultiSelectQuestion;

  public constructor(answer: string) {
    this.answer = answer;
  }
}

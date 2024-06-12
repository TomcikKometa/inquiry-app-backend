import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MultiSelectAnswer } from './multi-select-answer';

@Entity()
export class MultiSelectQuestion {
  @PrimaryGeneratedColumn()
  public id: number;
  @OneToMany(() => MultiSelectAnswer, (answers) => answers.multiSelectQuestion,{eager:true})
  public answers: MultiSelectAnswer[];
}

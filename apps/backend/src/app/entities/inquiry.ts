import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Inquiry {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  Name:string
}

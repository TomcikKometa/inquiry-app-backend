import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ScaleQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stepSize: number;

  @Column()
  max: number;

  @Column()
  min: number;

}

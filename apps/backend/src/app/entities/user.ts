import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from './enums/user-type';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({nullable:false,length:100,unique:true})
  public userName: string;

  @Column({nullable:false})
  public password: string;

  @Column({length:100})
  public firstName: string;

  @Column({length:100})
  public lastName: string;

  @Column({nullable:false})
  public emial: string;

  @Column()
  public userType: UserType;
}

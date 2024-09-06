import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  public email: string;

  @Column()
  public userType: number;
}

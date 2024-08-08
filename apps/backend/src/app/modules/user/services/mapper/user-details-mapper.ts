import { User } from '../../../../entities/user';
import { UserDetailsDto } from '../models/user-details-dto';

export class UserDetailsMapper {
  public static mapToUserDetails(user: User): UserDetailsDto {
    return {
      userName: user.userName
    };
  }
}

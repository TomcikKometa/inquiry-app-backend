import { User } from "../../../entities/user";

export class MapUserDtoResponse{
    public static mapUserDtoResponse(user:User):number{
        return user.id
    }
}
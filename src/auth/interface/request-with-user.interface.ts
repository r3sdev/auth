import { User } from "../../users/user.entity";

export interface RequestWithUser extends Request {
    user: User
}

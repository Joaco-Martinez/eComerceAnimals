// types/express/index.d.ts
import { User } from "../../types/types";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

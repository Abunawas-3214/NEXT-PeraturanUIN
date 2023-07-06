import { User, Account } from "next-auth";
import { Role } from "@prisma/client"

declare module "next-auth/jwt" {
    interface JWT {
        role: Role
        author: Boolean
    }
}

declare module "next-auth" {
    interface Session {
        user: User & {
            role: Role
            author: Boolean
        }
    }
}

import { User, Account } from "next-auth";
import { Role } from "@prisma/client"

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        role: Role
        author: Boolean
    }
}

declare module "next-auth" {
    interface Session {
        user: User & {
            id: string
            role: Role
            author: Boolean
        }
    }
}

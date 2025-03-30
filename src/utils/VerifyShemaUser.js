import { z } from "zod";

export const UserSchimaSignup = z.object({
    username    : z.string().min(3, "Username must be at least 3 characters").max(12),
    email       : z.string().min(12, "email is not required").max(22),
    password    : z.string().min(8, "Password must be at least 8 character")

})

export const UserSchimaSignin = z.object({
    username    : z.string().min(3, "Username must be at least 3 characters").max(12),
    password    : z.string().min(8, "Password must be at least 8 character")
})

export const PostSchimaCreate = z.object({
    title   : z.string().min(12, "Post must be at least 12 characters").max(20),
    desc    : z.string().min(20, "Description must be at least 20 character").max(40),
})
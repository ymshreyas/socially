"use server"

import prisma from "@/lib/prisma"
import { getDbUserId } from "./user.action"
import { revalidatePath } from "next/cache"

export async function createPost(content:string,imageUrl:string) {
    try {
        const userId = await getDbUserId()
        const post = await prisma.post.create({
            data:{
                content,
                image:imageUrl  ,
                authorId:userId
            }
        })
        revalidatePath("/")
        return {success:true,post}
    } catch (error) {
        console.log("Failed to create a post:",error)
        return {success:false,error:"Failed to create a post"}
    }
}
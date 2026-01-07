import { PrismaClient } from "@prisma/client";

const prismaForGlobal = globalThis;
export const db = prismaForGlobal.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production"){
    prismaForGlobal = db;
}
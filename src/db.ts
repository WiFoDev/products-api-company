/* eslint-disable no-var */
import { PrismaClient } from "@prisma/client";

declare global{
  var __db: PrismaClient | undefined;
}

if(!global.__db){
  global.__db = new PrismaClient();
}

export const db = global.__db;



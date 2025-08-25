import { prisma } from "@/lib/prisma";

export type User = prisma.user;
export type Transaction = prisma.transaction;
export type SavingsGoal = prisma.savingsGoal;
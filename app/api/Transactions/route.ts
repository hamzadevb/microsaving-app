import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const transactions = await prisma.transaction.findMany({
        include: { user: true },
    });
    return NextResponse.json(transactions);
}

export async function POST(req: Request) {
    const data = await req.json();
    const transaction = await prisma.transaction.create({ data });
    return NextResponse.json(transaction);
}

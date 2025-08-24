import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, amount, description } = body;

        const rounded = Math.ceil(amount);
        const appliedRounding = rounded - amount;

        const transaction = await prisma.transaction.create({
            data: {
                userId,
                amount,
                description,
                appliedRounding,
            },
        });

        return NextResponse.json(transaction);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 });
    }
}

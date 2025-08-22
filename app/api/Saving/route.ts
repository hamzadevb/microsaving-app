import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// GET all savings
// Get savings by userId
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json(
                { error: "userId is required" },
                { status: 400 }
            );
        }

        const savings = await prisma.saving.findMany({
            where: { userId: Number(userId) },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(savings, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

// POST new saving
/*export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body.userId || !body.amount) {
            return NextResponse.json(
                { error: "userId and amount are required" },
                { status: 400 }
            );
        }

        const saving = await prisma.saving.create({
            data: {
                userId: body.userId,
                amount: body.amount,
            },
        });

        return NextResponse.json(saving, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}*/

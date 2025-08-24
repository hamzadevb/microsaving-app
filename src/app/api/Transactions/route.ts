import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../lib/auth';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        // Fetch transactions for the logged-in user
        const transactions = await prisma.transaction.findMany({
            where: {
                user: {
                    email: session.user.email,
                },
            },
            orderBy: {
                date: 'desc',
            },
            take: 10, // Get the last 10 transactions
        });

        return NextResponse.json(transactions);
    } catch (error) {
        console.error('[TRANSACTIONS_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
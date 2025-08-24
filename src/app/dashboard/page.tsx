import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';
import Dashboard from '../../components/Dashboard';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    // Redirect logic would typically be in a middleware or layout
    if (!session?.user?.email) {
        return <div>Please log in</div>;
    }

    // Fetch data directly in the server component
    const userData = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { totalSaved: true, currency: true },
    });

    const recentTransactions = await prisma.transaction.findMany({
        where: { user: { email: session.user.email } },
        orderBy: { date: 'desc' },
        take: 5,
    });

    const goals = await prisma.savingsGoal.findMany({
        where: { user: { email: session.user.email }, status: 'ACTIVE' },
    });

    // Pass the data as props to a client component if interactivity is needed
    return (
        <Dashboard
            userData={userData}
            recentTransactions={recentTransactions}
            goals={goals}
        />
    );
}
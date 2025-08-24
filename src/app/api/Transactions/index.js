import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "POST") {
        // Record a transaction
        const { userId, amount, description } = req.body;

        try {
            // Apply rounding (example: round up to nearest 10)
            const rounded = Math.ceil(amount);
            const savedAmount = rounded - amount;

            const transaction = await prisma.transaction.create({
                data: {
                    userId,
                    amount,
                    description,
                    appliedRounding: rounded,
                    savedAmount,
                },
            });

            // Update Saving table
            await prisma.saving.upsert({
                where: { userId },
                update: { total: { increment: savedAmount } },
                create: { userId, total: savedAmount },
            });

            res.status(201).json(transaction);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    } else if (req.method === "GET") {
        // Get all transactions
        const transactions = await prisma.transaction.findMany();
        res.status(200).json(transactions);
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}

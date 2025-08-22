import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "GET") {
        const savings = await prisma.saving.findMany({
            include: { user: true },
        });
        res.status(200).json(savings);
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}

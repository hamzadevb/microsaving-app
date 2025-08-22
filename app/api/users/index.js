import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "POST") {
        // Create a new user
        const { name, email, password } = req.body;
        try {
            const user = await prisma.user.create({
                data: { name, email, password },
            });
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    } else if (req.method === "GET") {
        // Get all users
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}

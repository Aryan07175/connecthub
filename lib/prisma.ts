// Mock Prisma Client
// Replace with `import { PrismaClient } from '@prisma/client'` in production
export const prisma = {
    user: {
        findMany: async () => [],
        create: async () => ({ id: "1" }),
    },
    post: {
        findMany: async () => [],
        create: async () => ({ id: "1" }),
    },
    notification: {
        findMany: async () => [],
        create: async () => ({ id: "1" }),
    }
};

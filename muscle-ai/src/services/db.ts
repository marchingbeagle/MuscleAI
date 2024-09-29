import "@prisma/react-native";
import { PrismaClient } from "@prisma/client/react-native";
import { reactiveHooksExtension } from "@prisma/react-native";

const baseClient = new PrismaClient({
  log: ["query", "info", "warn"],
});

export const prismaClient = baseClient.$extends(reactiveHooksExtension());

export async function initializeDb(): Promise<void> {
  try {
    await baseClient.$connect();
  } catch (error) {
    console.error("Failed to connect to database", error);
    throw new Error("Failed to connect to database");
  }
}

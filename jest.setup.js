// Setup do Jest para React Native / Expo
// Ensure globals are initialized before jest-expo tries to use them
if (typeof global !== "undefined") {
  Object.defineProperty(global, "__DEV__", {
    value: true,
    writable: true,
    configurable: true,
  });
}

// Import testing library after React is properly initialized
try {
  require("@testing-library/react-native/extend-expect");
} catch (error) {
  // If extend-expect fails, continue without it
  console.warn("Could not load @testing-library/react-native/extend-expect:", error.message);
}

// Mock do Expo Router
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  router: {
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
  },
}));

// Mock do Clerk
jest.mock("@clerk/clerk-expo", () => ({
  useAuth: () => ({
    isSignedIn: true,
    userId: "test-user-id",
  }),
  useUser: () => ({
    user: {
      id: "test-user-id",
      emailAddresses: [{ emailAddress: "test@example.com" }],
    },
  }),
}));

// Mock do Prisma Client
jest.mock("./src/services/db", () => ({
  prismaClient: {
    aluno: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    treino: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

// Mock do Ionicons
jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
}));

// Silenciar logs durante os testes
if (typeof global !== "undefined" && global.console) {
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };
}

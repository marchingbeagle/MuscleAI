// Setup file that runs BEFORE jest-expo's setup
// This ensures React Native modules are properly initialized

// Mock React Native NativeModules before jest-expo tries to use them
jest.mock("react-native/Libraries/BatchedBridge/NativeModules", () => {
  const mockNativeModules = {
    NativeUnimoduleProxy: {
      modulesConstants: {
        mockDefinition: {
          ExponentConstants: {
            experienceUrl: {
              mock: "exp://192.168.1.200:8081",
            },
          },
        },
      },
      viewManagersMetadata: {},
    },
    UIManager: {},
    Linking: {},
  };
  return {
    default: mockNativeModules,
    __esModule: true,
  };
});


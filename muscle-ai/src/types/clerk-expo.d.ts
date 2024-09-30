declare module "@clerk/expo" {
  import { ReactNode } from "react";

  interface ClerkProviderProps {
    frontendApi: string;
    children: ReactNode;
  }

  export const ClerkProvider: React.FC<ClerkProviderProps>;
}

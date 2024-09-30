import React from "react";
import { ClerkProvider as ClerkExpoProvider } from "@clerk/expo";

const clerkfrontendApi = process.env.EXPO_PUBLIC_CLERK_FRONTEND_API!;

const ClerkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ClerkExpoProvider frontendApi={clerkfrontendApi}>
      {children}
    </ClerkExpoProvider>
  );
};

export default ClerkProvider;

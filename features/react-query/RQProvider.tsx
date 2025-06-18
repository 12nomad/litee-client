"use client";

import getQueryClient from "@/features/react-query/RQClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function RQProvider({ children }: Props) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default RQProvider;

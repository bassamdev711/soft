"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { useState } from "react";
import superjson from "superjson";
import { trpc } from "../lib/trpc";
import { COOKIE_NAME, UNAUTHED_ERR_MSG } from "../shared/const";
// import { startLogin } from "../client/src/const"; // We need to fix this path

export function TRPCReactProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
          transformer: superjson,
          headers() {
            try {
              const raw = sessionStorage.getItem("manus-cookie");
              if (raw) {
                const prefix = `${COOKIE_NAME}=`;
                const pair = raw.split(";").find(s => s.trim().startsWith(prefix));
                const token = pair?.trim().slice(prefix.length);
                if (token) {
                  return { Authorization: `Bearer ${token}` };
                }
              }
            } catch {
              // sessionStorage unavailable
            }
            return {};
          },
          fetch(input, init) {
            return globalThis.fetch(input, {
              ...(init ?? {}),
              credentials: "include",
            });
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}

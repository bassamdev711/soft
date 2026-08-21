import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../../../../server/routers";
import { createContext } from "../../../../server/_core/context";
import { assertRequestSize, assertTrustedMutationRequest } from "../../../../server/_core/security";

const handler = async (req: Request) => {
  try {
    assertRequestSize(req);
    assertTrustedMutationRequest(req);
    return await fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
    });
  } catch (error) {
    if (error instanceof Response) return error;
    throw error;
  }
};

export { handler as GET, handler as POST };

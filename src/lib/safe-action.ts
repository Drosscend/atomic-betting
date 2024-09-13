import { DEFAULT_SERVER_ERROR_MESSAGE, createSafeActionClient } from "next-safe-action";
import { auth } from "@/lib/auth";

class ActionError extends Error {}

// Base client.
const actionClient = createSafeActionClient({
  handleServerError(e) {
    console.error("Action error:", e.message);

    if (e instanceof ActionError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const authActionClient = actionClient
  // Define authorization middleware.
  .use(async ({ next }) => {
    const session = await auth();

    if (!session) {
      throw new ActionError("Unauthorized");
    }

    const { user } = session;

    if (!user) {
      throw new ActionError("Unauthorized");
    }

    return next({ ctx: { user } });
  });

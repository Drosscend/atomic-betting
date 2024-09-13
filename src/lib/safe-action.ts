import { DEFAULT_SERVER_ERROR_MESSAGE, createSafeActionClient } from "next-safe-action";

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
    // TODO: Implement your authorization logic here.
    const userId = "123";

    return next({ ctx: { userId } });
  });

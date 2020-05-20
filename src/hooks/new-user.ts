// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const user = await context.service.find({
      query: {
        username: context.data.username.toLowerCase(),
      },
    });

    if (user.data.length) {
      throw new Error("Username is already taken");
    }
    return context;
  };
};

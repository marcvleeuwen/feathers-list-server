// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { data } = context;

    switch (context.method) {
      case "create":
        context.data = {
          ...data,
          createdAt: new Date().toISOString(),
        };
        break;
      case "update":
        context.data = {
          ...data,
          updatedAt: new Date().toISOString(),
        };
        break;
    }

    return context;
  };
};

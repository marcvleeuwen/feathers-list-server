// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { app, data, params } = context;

    const addUser = async () => {
      const user = await app.service('users').get(params.user._id, params);
      context.data = {
        ...data,
        user: user,
      };
    };

    return context;
  };
};

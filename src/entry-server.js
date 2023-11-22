import createApp from "./app";

export default (context) => {
  return new Promise((resolve, reject) => {
    const { app, router, store, apollo } = createApp(process.env);
    const meta = app.$meta();
    store.state._env = context.req.session._env;
    router.push(context.req.url);
    router.onReady(async () => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        reject({ code: 404 });
      }
      const pages = matchedComponents.map((Component) => {
        if (Component.asyncData) {
          return Component.asyncData(
            Object.assign(context, {
              router,
              route: router.currentRoute,
              store,
              apollo,
            })
          );
        }
      });
      Promise.all(pages)
        .then(() => {
          context.state = store.state;
          context.meta = meta;
          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
};

import {createHydrogenContext} from '@shopify/hydrogen';

export async function createAppLoadContext(request: Request, env: Env, executionContext: ExecutionContext) {
  return createHydrogenContext({
    env,
    request,
    cache: await caches.open('hydrogen'),
    waitUntil: executionContext.waitUntil.bind(executionContext),
    i18n: {language: 'EN', country: 'US'},
    cart: {queryFragment: undefined},
  });
}

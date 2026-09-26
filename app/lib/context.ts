import {createHydrogenContext, type HydrogenSession} from '@shopify/hydrogen';
import {
  createCookieSessionStorage,
  type Session,
  type SessionStorage,
} from 'react-router';

class AppSession implements HydrogenSession {
  public isPending = false;

  constructor(
    private sessionStorage: SessionStorage,
    private session: Session,
  ) {}

  static async init(request: Request, secrets: string[]) {
    const storage = createCookieSessionStorage({
      cookie: {
        name: 'session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets,
      },
    });

    const session = await storage.getSession(
      request.headers.get('Cookie'),
    );

    return new this(storage, session);
  }

  get(key: string) {
    return this.session.get(key);
  }

  destroy() {
    return this.sessionStorage.destroySession(this.session);
  }

  flash(key: string, value: any) {
    this.isPending = true;
    this.session.flash(key, value);
  }

  unset(key: string) {
    this.isPending = true;
    this.session.unset(key);
  }

  set(key: string, value: any) {
    this.isPending = true;
    this.session.set(key, value);
  }

  commit() {
    this.isPending = false;
    return this.sessionStorage.commitSession(this.session);
  }
}

export async function createAppLoadContext(
  request: Request,
  env: Env,
  executionContext: ExecutionContext,
) {
  const session = await AppSession.init(
    request,
    [env.SESSION_SECRET],
  );

  return createHydrogenContext({
    env,
    request,
    cache: await caches.open('hydrogen'),
    waitUntil: executionContext.waitUntil.bind(executionContext),
    session,
    i18n: {language: 'EN', country: 'US'},
    cart: {queryFragment: undefined},
  });
}

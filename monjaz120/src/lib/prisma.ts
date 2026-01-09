// 📄 src/lib/prisma.ts
// Lazily initialize PrismaClient to avoid build-time failures when `prisma generate`
// hasn't been run. We expose `prisma` as a Proxy that forwards calls to the
// real client after dynamically importing it.

declare global {
  var prisma: any | undefined;
}

let _real: any = (global as any).prisma || null;

async function initReal() {
  if (_real) return _real;
  try {
    const mod = await import("@prisma/client");
    const PrismaClient = mod.PrismaClient;
    _real = new PrismaClient({ log: ["query", "error", "warn"] });
    if (process.env.NODE_ENV !== "production") (global as any).prisma = _real;
    return _real;
  } catch (e) {
    // If prisma client can't be imported/generated, surface a helpful error when used.
    _real = null;
    throw e;
  }
}

function createLazyProxy() {
  const handler: ProxyHandler<any> = {
    get(_, prop: string) {
      if (prop === "then") return undefined; // avoid being treated as Promise

      // return a function-like proxy for methods or nested properties
      return new Proxy(function () {}, {
        apply(_target, _thisArg, args) {
          return (async () => {
            const real = await initReal();
            const val = (real as any)[prop];
            if (typeof val === "function") return val.apply(real, args);
            // if it's not a function, just return it
            return val;
          })();
        },
        get(_t, nested) {
          // support chained access: prisma.model.findMany
          return (...args: any[]) => (async () => {
            const real = await initReal();
            const parent = (real as any)[prop];
            const fn = parent?.[nested as any];
            if (typeof fn === 'function') return fn.apply(parent, args);
            return fn;
          })();
        }
      });
    }
  };

  return new Proxy({}, handler) as any;
}

export const prisma: any = createLazyProxy();
export default prisma;


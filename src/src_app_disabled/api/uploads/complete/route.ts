import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// This endpoint is called after the client successfully PUTs the file to S3.
// It records metadata in the DB (DesignImage). Requires authentication; we use
// a simple x-user-id header as placeholder — replace with your auth.

export async function POST(req: Request) {
  try {
    // Prefer real session in production. Allow header fallback only in non-production
    const session = (await getServerSession(authOptions as any)) as any;
    const headerUserId = req.headers.get("x-user-id");
    const userId = session?.user?.id || (process.env.NODE_ENV !== "production" ? headerUserId : null);
    if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const body = await req.json();
    // Allow serviceId to be provided either in the JSON body or as an x-service-id header (the client often sends it as a header)
    const headerServiceId = req.headers.get("x-service-id");
    const { key, filename, size, mime } = body as {
      key: string;
      filename: string;
      size: number;
      mime: string;
    };
    const serviceId = (body && (body.serviceId as string)) || headerServiceId || undefined;

  if (!key || !filename) return NextResponse.json({ error: "missing" }, { status: 400 });

    // Development fallback: don't use Prisma/DB — record metadata locally
    if (process.env.NODE_ENV !== "production") {
      try {
        const fs = await import("fs/promises");
        const path = await import("path");
        const uploadsDir = path.join(process.cwd(), "data", "uploads");
        await fs.mkdir(uploadsDir, { recursive: true });
        const recordsFile = path.join(uploadsDir, "records.json");

        let records: any[] = [];
        try {
          const raw = await fs.readFile(recordsFile, "utf-8").catch(() => "");
          records = raw ? JSON.parse(raw) : [];
        } catch (e) {
          records = [];
        }

        const rec = { id: `${Date.now()}-${Math.random().toString(36).slice(2,8)}`, userId, serviceId: serviceId || null, key, filename, mime, size: size || 0, createdAt: new Date().toISOString() };
        records.push(rec);
        await fs.writeFile(recordsFile, JSON.stringify(records, null, 2), "utf-8");

        // If a serviceId was provided, update the local seller-services.json to include the new image
        if (serviceId) {
          try {
            const servicesPath = path.join(process.cwd(), "data", "seller-services.json");
            let services: any[] = [];
            try {
              const raw = await fs.readFile(servicesPath, "utf-8").catch(() => "");
              services = raw ? JSON.parse(raw) : [];
            } catch (e) {
              services = [];
            }

            const filenameOnly = path.basename(key);
            // Serve files through the api/static/uploads route so they're fetchable
            const publicPath = `/api/static/uploads?name=${encodeURIComponent(filenameOnly)}`;

            let updated = false;
            const newServices = services.map((s: any) => {
              if ((s.id === serviceId) || (s._id === serviceId)) {
                s.images = s.images || [];
                // prepend so latest appears first
                if (!s.images.includes(publicPath)) s.images.unshift(publicPath);
                updated = true;
              }
              return s;
            });

            // if service not found, optionally create a placeholder entry? we'll just write back existing services
            if (updated) {
              await fs.writeFile(servicesPath, JSON.stringify(newServices, null, 2), "utf-8");
            }
          } catch (svcErr) {
            console.error('failed to update local services for uploaded image', svcErr);
          }
        }

        return NextResponse.json({ ok: true, created: rec, local: true });
      } catch (innerErr) {
        console.error("complete upload dev fallback error", innerErr);
        return NextResponse.json({ error: String(innerErr?.message || innerErr) }, { status: 500 });
      }
    }

    // Production path: enforce role check and persist to DB
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.role !== "seller") {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    const created = await (prisma as any).designImage.create({
      data: {
        userId,
        serviceId: serviceId || null,
        s3Key: key,
        filename,
        mime,
        size: size || 0,
      },
    });

    return NextResponse.json({ ok: true, created });
  } catch (err: any) {
    console.error("complete upload error", err);
    const message = err?.message || String(err) || "server";
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({ error: message, stack: err?.stack }, { status: 500 });
    }
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;

  const listing = await prisma.listing.findUnique({ where: { id } });
  if (!listing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  if (listing.status !== "BOOKED") {
    return NextResponse.json(
      { error: "Listing must be 'BOOKED' to be sold" },
      { status: 400 }
    );
  }

  const updated = await prisma.listing.update({
    where: { id },
    data: {
      status: "SOLD",
    },
  });

  const normalized = {
    ...updated,
    status: updated.status.toLowerCase(),
  };

  return NextResponse.json(normalized);
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  const { buyerId } = await req.json();

  const listing = await prisma.listing.findUnique({ where: { id } });
  if (!listing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  if (listing.status !== "AVAILABLE") {
    return NextResponse.json(
      { error: "Not available for booking" },
      { status: 400 }
    );
  }

  if (listing.sellerId === buyerId) {
    return NextResponse.json(
      { error: "Cannot book your own listing" },
      { status: 400 }
    );
  }

  const updated = await prisma.listing.update({
    where: { id },
    data: {
      status: "BOOKED",
      buyerId,
    },
  });

  const normalized = {
    ...updated,
    status: updated.status.toLowerCase(),
  };

  return NextResponse.json(normalized);
}

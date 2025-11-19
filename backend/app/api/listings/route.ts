// backend/app/api/listings/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const sellerId = searchParams.get("sellerId");
  const buyerId = searchParams.get("buyerId");

  const where: any = {};

  if (status) {
    // DB enum is uppercase; frontend uses lowercase ("available" etc.)
    where.status = status.toUpperCase();
  }
  if (sellerId) {
    where.sellerId = sellerId;
  }
  if (buyerId) {
    where.buyerId = buyerId;
  }

  const listings = await prisma.listing.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  // Normalize status back to lowercase for the frontend
  const normalized = listings.map((l) => ({
    ...l,
    status: l.status.toLowerCase(), // AVAILABLE -> "available"
  }));

  return NextResponse.json(normalized);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, description, price, imageUrl, sellerId } = body;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      price: Number(price),
      imageUrl,
      sellerId,
      status: "AVAILABLE", // DB enum
    },
  });

  // Normalize status for frontend
  const normalized = {
    ...listing,
    status: listing.status.toLowerCase(),
  };

  return NextResponse.json(normalized, { status: 201 });
}

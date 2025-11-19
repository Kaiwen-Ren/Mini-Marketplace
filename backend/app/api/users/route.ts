import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: { id: "asc" }, // alice, bob, charlie
  });

  const usersWithAvatar = users.map((user) => {
    const u = user as any;

    const baseName = u.name || u.id;
    const avatarUrl =
      u.avatarUrl ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(baseName)}`;

    return {
      ...user,
      avatarUrl,
    };
  });

  return NextResponse.json(usersWithAvatar);
}

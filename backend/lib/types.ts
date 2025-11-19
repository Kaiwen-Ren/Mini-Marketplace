// backend/lib/types.ts
export type UserId = "alice" | "bob" | "charlie";

export interface User {
  id: UserId;
  name: string;
  avatarUrl: string | null;
}

export type ListingStatus = "available" | "booked" | "sold";

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  sellerId: UserId;
  buyerId?: UserId;
  status: ListingStatus;
}

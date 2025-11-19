// src/types.ts

// The three mock users in the system
export type UserId = "alice" | "bob" | "charlie";

export interface User {
  id: UserId;
  name: string;
  avatarUrl: string | null;
}

// Listing status lifecycle:
// - "available": created and visible on public Listings page
// - "booked": someone has booked it
// - "sold": seller confirmed the sale
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

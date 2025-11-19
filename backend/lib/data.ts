// backend/lib/data.ts
import { Listing, User } from "./types";

export const mockUsers: User[] = [
  { id: "alice", name: "Alice" },
  { id: "bob", name: "Bob" },
  { id: "charlie", name: "Charlie" },
];

let listings: Listing[] = [];

export function getListings() {
  return listings;
}

export function setListings(newListings: Listing[]) {
  listings = newListings;
}

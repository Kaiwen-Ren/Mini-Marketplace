// src/pages/BuyingsPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Listing } from "../types";
import { apiGet } from "../api";
import { useUser } from "../UserContext";

const sellerNameMap: Record<string, string> = {
  alice: "Alice",
  bob: "Bob",
  charlie: "Charlie",
};

const defaultImage =
  "data:image/png;base64,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";

const fallbackAvatar =
  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

const BuyingsPage: React.FC = () => {
  const { currentUserId, users } = useUser();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Details 弹窗
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  // sellerId -> User 的 map
  const userMap = useMemo(() => {
    const map: Record<string, (typeof users)[number]> = {};
    for (const u of users) {
      map[u.id] = u;
    }
    return map;
  }, [users]);

  const getSellerDisplay = (sellerId: string) => {
    const seller = userMap[sellerId];
    const name =
      seller?.name ||
      sellerNameMap[sellerId] ||
      sellerId;
    const avatarUrl = seller?.avatarUrl || fallbackAvatar;
    return { name, avatarUrl };
  };

  const loadListings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data: Listing[] = await apiGet(
        `/api/listings?buyerId=${encodeURIComponent(currentUserId)}`
      );
      setListings(data);
    } catch (err: any) {
      setError(err.message || "Failed to load your buyings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadListings();
  }, [currentUserId]);

  if (loading && listings.length === 0) {
    return <div>Loading your buyings...</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-semibold text-gray-900">My Buyings</h2>
      </div>

      {error && <div className="text-sm text-red-500">Error: {error}</div>}
      {listings.length === 0 && !loading && (
        <p className="text-sm text-gray-500">
          You have not booked or bought any listings yet.
        </p>
      )}

      <div
        className="
          grid gap-4
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          xl:grid-cols-4
        "
      >
        {listings.map((listing) => {
          const seller = getSellerDisplay(listing.sellerId);

          return (
            <div
              key={listing.id}
              className="card w-75 bg-base-100 card-xl shadow-sm h-full flex flex-col"
            >
              <figure>
                <img
                  src={listing.imageUrl || defaultImage}
                  onError={(e) => (e.currentTarget.src = defaultImage)}
                  className="mb-3 h-56 w-full rounded-md object-cover"
                />
              </figure>

              <div className="card-body flex-1 flex flex-col gap-1 p-3">
                <h2 className="card-title">
                  {listing.title}
                  <div
                    className={`
                      badge ml-2
                      ${
                        listing.status === "available"
                          ? "bg-green-600 text-white"
                          : ""
                      }
                      ${
                        listing.status === "booked"
                          ? "bg-blue-600 text-white"
                          : ""
                      }
                      ${
                        listing.status === "sold"
                          ? "bg-gray-400 text-white"
                          : ""
                      }
                    `}
                  >
                    {listing.status.toUpperCase()}
                  </div>
                </h2>

                <h2 className="card-title">${listing.price}</h2>

                <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                  {listing.description}
                </p>

                {/* Seller avatar + name */}
                <div className="mt-2 flex items-center gap-2">
                  <img
                    src={seller.avatarUrl}
                    alt={seller.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-xs text-gray-500">
                    {seller.name}
                  </span>
                </div>

                {/* Details 按钮（打开弹窗） */}
                <button
                  type="button"
                  className="text-xs text-gray-500 hover:text-gray-800 underline-offset-2 hover:underline px-0 py-0 mt-1 text-left"
                  onClick={() => setSelectedListing(listing)}
                >
                  Details
                </button>

                {/* 保证卡片高度一致 */}
                <div className="mt-auto" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Details 弹窗 */}
      {selectedListing && (() => {
        const seller = getSellerDisplay(selectedListing.sellerId);
        return (
          <div className="modal">
            <div
              className="modal-backdrop"
              onClick={() => setSelectedListing(null)}
            />
            <div className="modal-box max-w-lg">
              <button
                type="button"
                className="modal-close"
                onClick={() => setSelectedListing(null)}
                aria-label="Close"
              >
                ×
              </button>

              <div className="space-y-3">
                <img
                  src={selectedListing.imageUrl || defaultImage}
                  onError={(e) => (e.currentTarget.src = defaultImage)}
                  className="w-full h-64 object-cover rounded-md"
                />

                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-semibold">
                    {selectedListing.title}
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    ${selectedListing.price}
                  </p>
                </div>

                {/* Seller avatar + name in modal */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <img
                    src={seller.avatarUrl}
                    alt={seller.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span>{seller.name}</span>
                </div>

                {/* 完整 description */}
                <p className="text-sm text-gray-800 whitespace-pre-wrap">
                  {selectedListing.description}
                </p>

                <div className="modal-actions justify-end">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setSelectedListing(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default BuyingsPage;

import React, { useState } from "react";
import { useUser } from "../UserContext";
import { UserId } from "../types";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { users, currentUserId, currentUser, setCurrentUserId } = useUser();
  const [open, setOpen] = useState(false); 

  const fallbackAvatar =
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

  const formatId = (id: string) =>
    id.charAt(0).toUpperCase() + id.slice(1);

  const displayName = currentUser?.name || formatId(currentUserId);

  const handleSelect = (id: UserId) => {
    setCurrentUserId(id);
    setOpen(false);
  };

  return (
    <div className="navbar bg-white shadow-sm px-4 relative">
      {/* Title */}
      <div className="flex-1">
        <span className="text-3xl font-bold">Mini Marketplace</span>
      </div>

      {/* Tabs */}
      <div role="tablist" className="tabs mx-4">
        <a
          role="tab"
          className={`tab ${activeTab === "listings" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("listings")}
        >
          Listings
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === "selling" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("selling")}
        >
          My Selling
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === "buyings" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("buyings")}
        >
          My Buyings
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === "create" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("create")}
        >
          Create
        </a>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">

        {/* User Toggle List */}
        <div className="relative">
          {/* Header */}
          <button
            className="flex items-center gap-1 cursor-pointer px-2 py-1 hover:bg-gray-100 rounded-md select-none"
            onClick={() => setOpen(!open)}
          >
            <span className="font-medium">{displayName}</span>

            {/* Arrow */}
            <span
              className={`transition-transform duration-200 text-xs ${
                open ? "rotate-180" : "rotate-0"
              }`}
            >
              ▼
            </span>
          </button>

          {/* Toggle List */}
          {open && (
            <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow z-50">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  onClick={() => handleSelect(user.id as UserId)}
                >
                  {/* 小头像 + 名字（可选） */}
                  {user.avatarUrl && (
                    <img
                      src={user.avatarUrl}
                      alt={user.name || formatId(user.id)}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  )}
                  <span>{user.name || formatId(user.id)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Avatar Dropdown：头像跟着 currentUser 变 */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt={currentUser?.name || "User avatar"}
                src={currentUser?.avatarUrl || fallbackAvatar}
                className="object-cover"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Navbar;

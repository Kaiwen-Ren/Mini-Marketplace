// frontend/src/App.tsx
import React, { useState } from "react";
import { useUser } from "./UserContext";
import ListingsPage from "./pages/ListingsPage";
import CreateListingPage from "./pages/CreateListingPage";
import SellingPage from "./pages/SellingPage";
import BuyingsPage from "./pages/BuyingsPage";
import Navbar from "./components/Navbar"

type Tab = "listings" | "create" | "selling" | "buyings";

function App() {
  const [activeTab, setActiveTab] = useState("listings");
  const { currentUserId, setCurrentUserId } = useUser();

  return (
    <div>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-6xl mx-auto px-6 py-6">
        {activeTab === "listings" && <ListingsPage />}
        {activeTab === "selling" && <SellingPage />}
        {activeTab === "buyings" && <BuyingsPage />}
        {activeTab === "create" && <CreateListingPage />}
      </main>
      
    </div>
  );
}

export default App;

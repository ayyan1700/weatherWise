import React from "react";
import { Search, MapPin } from "lucide-react";

export default function SearchBar({
  search,
  setSearch,
  fetchByCity,
  fetchByLocation,
}) {
  // Function to handle search and clear input
  const handleSearch = () => {
    if (!search) return;       // Do nothing if input empty
    fetchByCity();
    setSearch("");             // Clear input
  };

  return (
    <div className="w-full max-w-md">
      <div
        className="
          flex items-center gap-3
          rounded-full
          px-4 py-3
          bg-gradient-to-r
          from-blue-700
          to-blue-900
          shadow-lg
          hover:shadow-xl
          transition
        "
      >
        {/* Search Icon */}
        <Search size={18} className="text-blue-100" />

        {/* Input */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search city"
          className="flex-1 bg-transparent outline-none text-white placeholder-blue-200"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}  // Enter triggers search + clear
        />

        {/* Location Icon */}
        <button
          onClick={fetchByLocation}
          className="text-blue-200 hover:text-white transition"
          title="Use current location"
        >
          <MapPin size={18} />
        </button>
      </div>
    </div>
  );
}

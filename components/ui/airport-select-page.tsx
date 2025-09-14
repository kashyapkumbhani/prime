"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckIcon, ChevronLeft, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Airport {
  name: string;
  city: string;
  country: string;
  code: string;
}

interface AirportSelectPageProps {
  value: Airport | null;
  onChange: (airport: Airport) => void;
  airports: Airport[];
  onClose: () => void;
  title: string;
}

export function AirportSelectPage({
  value,
  onChange,
  airports,
  onClose,
  title
}: AirportSelectPageProps) {
  const [searchValue, setSearchValue] = useState("");
  const [filteredAirports, setFilteredAirports] = useState<Airport[]>([]);

  useEffect(() => {
    if (searchValue.length >= 2) {
      const filtered = airports.filter(airport => 
        airport.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        airport.city.toLowerCase().includes(searchValue.toLowerCase()) ||
        airport.country.toLowerCase().includes(searchValue.toLowerCase()) ||
        airport.code.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredAirports(filtered);
    } else {
      setFilteredAirports([]);
    }
  }, [searchValue, airports]);

  const handleSelect = (airport: Airport) => {
    onChange(airport);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white safe-area-inset">
        <div className="flex items-center p-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-blue-700 -ml-2"
            onClick={onClose}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold ml-2">{title}</h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search airports..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10 pr-10 h-12 text-base bg-white"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          {searchValue && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={() => setSearchValue("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2">Type at least 2 characters to search</p>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto">
        {searchValue.length < 2 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Search className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500">Start typing to search for airports</p>
          </div>
        ) : filteredAirports.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <p className="text-gray-500">No airports found for "{searchValue}"</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredAirports.slice(0, 50).map((airport) => (
              <button
                key={airport.code}
                className={cn(
                  "w-full text-left p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors",
                  "focus:outline-none focus:bg-gray-50",
                  value?.code === airport.code && "bg-blue-50"
                )}
                onClick={() => handleSelect(airport)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 pr-4">
                    <div className="font-medium text-gray-900">
                      {airport.name}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {airport.city}, {airport.country}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {airport.code}
                    </div>
                  </div>
                  {value?.code === airport.code && (
                    <CheckIcon className="h-5 w-5 text-blue-600 shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
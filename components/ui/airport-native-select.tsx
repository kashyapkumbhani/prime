"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Airport {
  name: string;
  city: string;
  country: string;
  code: string;
}

interface AirportNativeSelectProps {
  value: Airport | null;
  onChange: (airport: Airport) => void;
  airports: Airport[];
  placeholder?: string;
  label?: string;
}

export function AirportNativeSelect({
  value,
  onChange,
  airports,
  placeholder = "Select Airport"
}: AirportNativeSelectProps) {
  const [searchMode, setSearchMode] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Group airports by country for better organization
  const groupedAirports = useMemo(() => {
    const groups: { [key: string]: Airport[] } = {};
    airports.forEach(airport => {
      if (!groups[airport.country]) {
        groups[airport.country] = [];
      }
      groups[airport.country].push(airport);
    });
    
    // Sort countries and airports within each country
    const sortedGroups: { [key: string]: Airport[] } = {};
    Object.keys(groups).sort().forEach(country => {
      sortedGroups[country] = groups[country].sort((a, b) => a.city.localeCompare(b.city));
    });
    
    return sortedGroups;
  }, [airports]);

  const filteredAirports = useMemo(() => {
    if (!searchValue || searchValue.length < 2) return airports;
    
    return airports.filter(airport =>
      airport.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      airport.city.toLowerCase().includes(searchValue.toLowerCase()) ||
      airport.country.toLowerCase().includes(searchValue.toLowerCase()) ||
      airport.code.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, airports]);

  // Mobile version with native select
  if (isMobile && !searchMode) {
    return (
      <div className="space-y-2">
        <div className="flex gap-2">
          <select
            className={cn(
              "flex-1 h-12 px-3 text-base rounded-md border border-gray-300",
              "bg-white focus:outline-none focus:ring-2 focus:ring-blue-500",
              !value && "text-gray-500"
            )}
            value={value?.code || ""}
            onChange={(e) => {
              const selectedAirport = airports.find(a => a.code === e.target.value);
              if (selectedAirport) onChange(selectedAirport);
            }}
          >
            <option value="">{placeholder}</option>
            {Object.entries(groupedAirports).map(([country, countryAirports]) => (
              <optgroup key={country} label={country}>
                {countryAirports.map(airport => (
                  <option key={airport.code} value={airport.code}>
                    {airport.city} - {airport.name} ({airport.code})
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12"
            onClick={() => setSearchMode(true)}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
        
        {value && (
          <div className="text-sm text-gray-600 px-1">
            Selected: {value.name}, {value.city}
          </div>
        )}
      </div>
    );
  }

  // Search mode or desktop
  if (searchMode || !isMobile) {
    return (
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            className="w-full h-12 pl-10 pr-3 text-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search airports (min 2 characters)..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        
        {searchValue.length >= 2 && (
          <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md">
            {filteredAirports.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No airports found</div>
            ) : (
              filteredAirports.slice(0, 50).map(airport => (
                <button
                  key={airport.code}
                  className={cn(
                    "w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100",
                    "focus:outline-none focus:bg-gray-50",
                    value?.code === airport.code && "bg-blue-50"
                  )}
                  onClick={() => {
                    onChange(airport);
                    setSearchMode(false);
                    setSearchValue("");
                  }}
                >
                  <div className="font-medium">{airport.city} ({airport.code})</div>
                  <div className="text-sm text-gray-500">{airport.name}, {airport.country}</div>
                </button>
              ))
            )}
          </div>
        )}
        
        {isMobile && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setSearchMode(false);
              setSearchValue("");
            }}
          >
            Cancel Search
          </Button>
        )}
      </div>
    );
  }

  return null;
}
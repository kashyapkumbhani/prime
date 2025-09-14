"use client";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { AirportSelectPage } from "./airport-select-page";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Airport {
  name: string;
  city: string;
  country: string;
  code: string;
}

interface AirportDropdownProps {
  value: Airport | null;
  onChange: (airport: Airport) => void;
  airports: Airport[];
  placeholder?: string;
  label?: string;
}

export function AirportDropdown({
  value,
  onChange,
  airports,
  placeholder = "Select Airport",
  label = "Select Airport"
}: AirportDropdownProps) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredAirports = airports.filter(airport => 
    searchValue.length >= 2 && (
      airport.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      airport.city.toLowerCase().includes(searchValue.toLowerCase()) ||
      airport.country.toLowerCase().includes(searchValue.toLowerCase()) ||
      airport.code.toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  // Mobile: Full page navigation
  if (isMobile) {
    return (
      <>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between h-12 text-left"
          onClick={() => setOpen(true)}
        >
          <div className="flex-1 truncate">
            {value ? (
              <span className="block truncate">
                {value.city} ({value.code})
              </span>
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </div>
          <MapPin className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
        
        {open && typeof window !== 'undefined' && ReactDOM.createPortal(
          <AirportSelectPage
            value={value}
            onChange={onChange}
            airports={airports}
            onClose={() => setOpen(false)}
            title={label}
          />,
          document.body
        )}
      </>
    );
  }

  // Desktop: Traditional dropdown
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-12 text-left"
        >
          <div className="flex-1 truncate">
            {value ? (
              <span className="block truncate">
                {value.name} - {value.city}, {value.country}
              </span>
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </div>
          <MapPin className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Type 2 or more characters..."
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandEmpty>No airports found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {filteredAirports.slice(0, 10).map((airport) => (
                <CommandItem
                  key={airport.code}
                  value={`${airport.name} ${airport.city} ${airport.country}`}
                  onSelect={() => {
                    onChange(airport);
                    setOpen(false);
                    setSearchValue("");
                  }}
                >
                  <div className="flex-1">
                    <div className="font-medium">{airport.name}</div>
                    <div className="text-sm text-gray-500">
                      {airport.city}, {airport.country} ({airport.code})
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
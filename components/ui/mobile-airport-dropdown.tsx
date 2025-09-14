"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckIcon, MapPin, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface Airport {
  name: string;
  city: string;
  country: string;
  code: string;
}

interface MobileAirportDropdownProps {
  value: Airport | null;
  onChange: (airport: Airport) => void;
  airports: Airport[];
  placeholder?: string;
  label?: string;
}

export function MobileAirportDropdown({
  value,
  onChange,
  airports,
  placeholder = "Search Airport",
  label = "Select Airport"
}: MobileAirportDropdownProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const isIOSDevice = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
      setIsIOS(isIOSDevice);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prevent body scroll when modal is open on iOS
  useEffect(() => {
    if (open && isIOS) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [open, isIOS]);

  const filteredAirports = airports.filter(airport => 
    searchValue.length >= 2 && (
      airport.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      airport.city.toLowerCase().includes(searchValue.toLowerCase()) ||
      airport.country.toLowerCase().includes(searchValue.toLowerCase()) ||
      airport.code.toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const handleSelect = (airport: Airport) => {
    onChange(airport);
    setOpen(false);
    setSearchValue("");
  };

  const triggerButton = (
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      className="w-full justify-between h-12 text-left touch-manipulation"
      onClick={() => setOpen(true)}
      style={{ WebkitTapHighlightColor: 'transparent' }}
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
  );

  const searchContent = (
    <>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          ref={inputRef}
          placeholder="Type 2 or more characters for results..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-10 pr-10 h-12"
          autoFocus={!isMobile}
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
      
      <div className="mt-4 flex-1 overflow-hidden">
        {searchValue.length < 2 ? (
          <p className="text-sm text-gray-500 text-center py-8">
            Type at least 2 characters to search airports
          </p>
        ) : filteredAirports.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">
            No airports found
          </p>
        ) : (
          <div className="max-h-[50vh] overflow-y-auto -mx-4 px-4 -webkit-overflow-scrolling-touch">
            {filteredAirports.slice(0, 20).map((airport) => (
              <button
                key={airport.code}
                className={cn(
                  "w-full text-left px-4 py-4 hover:bg-gray-100 transition-colors",
                  "focus:bg-gray-100 focus:outline-none",
                  "border-b border-gray-100 last:border-0",
                  "active:bg-gray-200", // Better touch feedback
                  "cursor-pointer select-none", // Prevent text selection on touch
                  "-webkit-tap-highlight-color-transparent", // Remove iOS tap highlight
                  value?.code === airport.code && "bg-blue-50 hover:bg-blue-100"
                )}
                onClick={() => handleSelect(airport)}
                onTouchStart={(e) => {
                  // Better touch handling for iOS
                  e.currentTarget.classList.add('bg-gray-200');
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.classList.remove('bg-gray-200');
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-2">
                    <div className="font-medium text-gray-900">
                      {airport.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {airport.city}, {airport.country} ({airport.code})
                    </div>
                  </div>
                  {value?.code === airport.code && (
                    <CheckIcon className="h-5 w-5 text-blue-600 mt-1 shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );

  if (isMobile) {
    return (
      <>
        {triggerButton}
        <Drawer 
          open={open} 
          onOpenChange={setOpen}
          shouldScaleBackground={false} // Prevent background scaling on iOS
        >
          <DrawerContent className="max-h-[85vh] overflow-hidden">
            <DrawerHeader className="pb-2">
              <DrawerTitle>{label}</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-4 overflow-hidden flex flex-col">
              {searchContent}
            </div>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline" size="lg" className="w-full touch-manipulation">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return (
    <>
      {triggerButton}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{label}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {searchContent}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
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
  const [keyboardHeight, setKeyboardHeight] = useState(0);
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

  // Handle visual viewport changes (keyboard appearance) on iOS
  useEffect(() => {
    if (open && isIOS && 'visualViewport' in window) {
      const handleViewportChange = () => {
        const viewport = window.visualViewport;
        if (viewport) {
          const keyboardHeight = window.innerHeight - viewport.height;
          setKeyboardHeight(keyboardHeight);
        }
      };

      window.visualViewport?.addEventListener('resize', handleViewportChange);
      window.visualViewport?.addEventListener('scroll', handleViewportChange);

      return () => {
        window.visualViewport?.removeEventListener('resize', handleViewportChange);
        window.visualViewport?.removeEventListener('scroll', handleViewportChange);
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
    <div className="flex flex-col h-full">
      <div className="relative flex-shrink-0">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          ref={inputRef}
          placeholder="Type 2 or more characters for results..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-10 pr-10 h-12"
          autoFocus={false} // Disable auto-focus to prevent keyboard issues
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          inputMode="text"
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
      
      <div className="mt-4 flex-1 overflow-hidden min-h-0">
        {searchValue.length < 2 ? (
          <p className="text-sm text-gray-500 text-center py-8">
            Type at least 2 characters to search airports
          </p>
        ) : filteredAirports.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">
            No airports found
          </p>
        ) : (
          <div className="h-full overflow-y-auto -mx-4 px-4 -webkit-overflow-scrolling-touch overscroll-contain">
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
    </div>
  );

  if (isMobile) {
    const modalContent = open ? (
      <div 
        className="fixed inset-0 z-[9999] flex items-end" 
        style={{ 
          position: 'fixed',
          bottom: keyboardHeight > 0 ? `${keyboardHeight}px` : '0'
        }}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 animate-in fade-in-0"
          onClick={() => setOpen(false)}
          style={{ bottom: keyboardHeight > 0 ? `-${keyboardHeight}px` : '0' }}
        />
            
            {/* Content */}
            <div 
              className="relative w-full bg-white rounded-t-xl animate-in slide-in-from-bottom duration-200"
              style={{
                maxHeight: keyboardHeight > 0 ? '50vh' : '60vh',
                height: 'auto',
                paddingBottom: 'env(safe-area-inset-bottom, 0px)',
                position: 'relative',
                transform: 'translate3d(0, 0, 0)' // Force GPU acceleration
              }}
            >
              {/* Handle bar */}
              <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-gray-300" />
              
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-center">{label}</h2>
              </div>
              
              {/* Search and Results */}
              <div 
                className="flex flex-col" 
                style={{ 
                  maxHeight: keyboardHeight > 0 ? 'calc(50vh - 140px)' : 'calc(60vh - 140px)' 
                }}
              >
                <div className="px-4 py-3 border-b border-gray-100 flex-shrink-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      ref={inputRef}
                      placeholder="Type 2 or more characters..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="pl-10 pr-10 h-12 text-base"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      inputMode="text"
                      style={{ fontSize: '16px' }} // Prevent zoom on iOS
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
                </div>
                
                {/* Results */}
                <div 
                  className="flex-1 overflow-y-auto overscroll-contain"
                  style={{ 
                    WebkitOverflowScrolling: 'touch',
                    touchAction: 'pan-y'
                  }}
                >
                  {searchValue.length < 2 ? (
                    <p className="text-sm text-gray-500 text-center py-8">
                      Type at least 2 characters to search airports
                    </p>
                  ) : filteredAirports.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-8">
                      No airports found
                    </p>
                  ) : (
                    <div>
                      {filteredAirports.slice(0, 20).map((airport) => (
                        <button
                          key={airport.code}
                          className={cn(
                            "w-full text-left px-4 py-4 hover:bg-gray-100 transition-colors",
                            "focus:bg-gray-100 focus:outline-none",
                            "border-b border-gray-100 last:border-0",
                            "active:bg-gray-200",
                            value?.code === airport.code && "bg-blue-50"
                          )}
                          onClick={() => handleSelect(airport)}
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
              </div>
              
              {/* Footer */}
              <div className="border-t border-gray-200 px-4 py-3">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
    ) : null;

    return (
      <>
        {triggerButton}
        {typeof window !== 'undefined' && modalContent && ReactDOM.createPortal(modalContent, document.body)}
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
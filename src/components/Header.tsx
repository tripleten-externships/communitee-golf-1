import React from "react";

export interface HeaderProps {
  onClose?: () => void;
  onLogout?: () => void;
  isLoggedIn?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onClose,
  onLogout,
  isLoggedIn = false,
}) => (
  <div className="relative w-full mb-6 py-1 flex items-center justify-center">
    {/* Logout on left when logged in */}
    {isLoggedIn && onLogout && (
      <button
        onClick={onLogout}
        className="absolute top-1 left-1 text-sm font-medium text-red-500 hover:underline"
        aria-label="Logout"
      >
        <img
          src="/icons/sign-out.svg"
          alt="Close"
          className="w-[22px] h-[22px] object-contain hover:scale-105 transition-transform ease-in-out"
        />
      </button>
    )}

    {/* Logo centered */}
    <img
      src="/icons/communitee-logo.png"
      alt="CommuniTee Logo"
      className="max-h-[20px] max-w-[152px] object-contain"
    />

    {/* Close on right */}
    {onClose && (
      <button
        onClick={onClose}
        className="absolute top-1.5 right-1 p-1 z-10"
        aria-label="Close"
      >
        <img
          src="/icons/close-btn.svg"
          alt="Close"
          className="w-[10px] h-[10px] object-contain hover:scale-125 transition-transform ease-in-out"
        />
      </button>
    )}
  </div>
);

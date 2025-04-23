import React, { useState } from "react";

// storage key for the jwt
const AUTH_TOKEN_KEY = "authToken";

interface LoginFormProps {
  onLogin: () => void;
  onClose?: () => void;
  onForgotPassword?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  onClose,
  onForgotPassword,
}) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  // ui state for errors and loading
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // simple client-side validation
    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Login failed");
      }

      const data = await res.json();
      const token = data.token;
      if (token) {
        // persist token in chrome storage. this can be changed to whatever works with the backend.
        chrome.storage.local.set({ [AUTH_TOKEN_KEY]: token });
      }

      onLogin();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* close button */}
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

      {/* logo */}
      <div className="flex justify-center mb-6 py-1">
        <img
          src="/icons/communitee-logo.png"
          alt="Communitee Logo"
          className="max-h-[20px] max-w-[152px] object-contain"
        />
      </div>

      {/* form username and password */}
      <form
        onSubmit={handleSubmit}
        aria-busy={loading}
        className="space-y-4 pr-[28px] pl-[28px]"
      >
        <div className="mt-[137px]">
          <label
            htmlFor="username"
            className="block text-base font-poppins font-regular text-gray-700"
          ></label>
          <input
            type="text"
            id="username"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="font-poppins font-regular mt-1 block w-full rounded-xl border border-[rgba(149,148,148,1)] px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-base font-poppins font-regular text-gray-700"
          ></label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="font-poppins font-regular mt-1 block w-full rounded-xl border border-[rgba(149,148,148,1)] px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* added in error text. we can move this anywhere that makes it more aesthetic stylewise. */}
        {error && (
          <p
            aria-live="polite"
            className="text-center text-sm text-red-500 mb-2"
          >
            {error}
          </p>
        )}

        {/* submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 rounded-xl shadow-sm text-base text-white font-poppins font-semibold bg-[#ff3131] hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing In…" : "Sign in"}
        </button>
      </form>

      {/* forgot password */}
      <p
        onClick={onForgotPassword}
        className="mt-4 text-center font-poppins font-medium text-sm text-black hover:underline cursor-pointer"
      >
        Forgot Password?
      </p>
    </div>
  );
};

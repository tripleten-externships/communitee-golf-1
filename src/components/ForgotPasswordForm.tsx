import React, { useState } from "react";
import { forgotPassword } from "./utils/api";

export interface ForgotPasswordFormProps {
  onBackToLogin?: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onBackToLogin,
}) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    setLoading(true);
    try {
      await forgotPassword(username);
      setMessage(
        "Check your email for instructions on resetting your password."
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong, try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        aria-busy={loading}
        className="space-y-4 pr-[28px] pl-[28px]"
      >
        <div className="mt-[137px]">
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="font-poppins font-regular mt-1 block w-full rounded-xl border border-border-grey px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 rounded-xl shadow-sm text-base text-white font-poppins font-semibold bg-red-orange hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending…" : "Send reset link"}
        </button>
      </form>

      <p
        onClick={onBackToLogin}
        className="mt-4 text-center font-poppins font-medium text-sm text-black hover:underline cursor-pointer"
      >
        Back to login
      </p>

      {/* confirmation message */}
      {message && (
        <p
          aria-live="polite"
          className="text-center text-sm text-green-600 mb-2 mt-2"
        >
          {message}
        </p>
      )}
      {/* error message */}
      {error && (
        <p
          aria-live="polite"
          className="text-center text-sm text-red-500 mb-2 mt-2"
        >
          {error}
        </p>
      )}
    </div>
  );
};

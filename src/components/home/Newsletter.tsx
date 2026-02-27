"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { contactService } from "@/api/services";

type SubmitStatus = "idle" | "success" | "already_subscribed" | "error";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setIsSubmitting(true);
    setStatus("idle");
    setStatusMessage("");

    try {
      const res = await contactService.subscribe({ email: trimmed });

      if (res.success && res.message?.toLowerCase().includes("already subscribed")) {
        setStatus("already_subscribed");
        setStatusMessage(res.message || "You're already subscribed.");
      } else if (res.success) {
        setStatus("success");
        setStatusMessage(res.message || "Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setStatusMessage(res.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }

    // Reset status after 6 seconds so user can try again
    setTimeout(() => {
      setStatus("idle");
      setStatusMessage("");
    }, 6000);
  };

  const showResult = status !== "idle";

  return (
    <section className="relative w-full py-10 md:py-12 lg:py-14 bg-[#FAF9F6] overflow-hidden">
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-brand-orange/5 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl shadow-gray-300/60 border-2 border-gray-200/80 p-6 md:p-8 lg:p-10 backdrop-blur-sm">
            <div className="text-center mb-6 md:mb-8 space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-orange/10 mb-3">
                <Mail className="w-6 h-6 md:w-7 md:h-7 text-brand-orange" />
              </div>
              <p
                className="text-brand-orange text-sm md:text-base lg:text-lg italic tracking-wide"
                style={{ fontFamily: "cursive" }}
              >
                Stay Connected
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-black tracking-tight">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                Get exclusive travel tips, special offers, and updates about new destinations delivered straight to your inbox.
              </p>
            </div>

            <div className="max-w-xl mx-auto">
              {showResult ? (
                <div
                  className={cn(
                    "rounded-xl md:rounded-2xl p-6 md:p-8 text-center border",
                    status === "success" &&
                      "bg-green-50 border-green-100",
                    status === "already_subscribed" &&
                      "bg-brand-orange/5 border-brand-orange/20",
                    status === "error" &&
                      "bg-red-50 border-red-100"
                  )}
                >
                  {status === "success" && (
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-green-100 mb-3">
                      <CheckCircle2 className="w-7 h-7 md:w-8 md:h-8 text-green-600" />
                    </div>
                  )}
                  {status === "already_subscribed" && (
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-orange/10 mb-3">
                      <Info className="w-7 h-7 md:w-8 md:h-8 text-brand-orange" />
                    </div>
                  )}
                  {status === "error" && (
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-red-100 mb-3">
                      <Mail className="w-7 h-7 md:w-8 md:h-8 text-red-600" />
                    </div>
                  )}
                  <h3
                    className={cn(
                      "text-lg md:text-xl font-bold mb-2",
                      status === "success" && "text-gray-900",
                      status === "already_subscribed" && "text-gray-900",
                      status === "error" && "text-gray-900"
                    )}
                  >
                    {status === "success" && "Thank You for Subscribing!"}
                    {status === "already_subscribed" && "Already Subscribed"}
                    {status === "error" && "Something Went Wrong"}
                  </h3>
                  <p
                    className={cn(
                      "text-sm md:text-base",
                      status === "success" && "text-gray-600",
                      status === "already_subscribed" && "text-gray-600",
                      status === "error" && "text-red-600"
                    )}
                  >
                    {statusMessage}
                  </p>
                  {status === "success" && (
                    <p className="text-gray-500 text-xs mt-2">
                      Check your inbox for updates and offers.
                    </p>
                  )}
                  {status === "already_subscribed" && (
                    <p className="text-gray-500 text-xs mt-2">
                      You’re on the list. Look for our emails in your inbox.
                    </p>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Mail className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className={cn(
                          "w-full pl-10 pr-4 py-3 md:py-3.5 rounded-lg md:rounded-xl",
                          "bg-gray-50 border border-gray-200",
                          "text-gray-900 placeholder:text-gray-400",
                          "focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange",
                          "transition-all duration-300",
                          "text-sm md:text-base",
                          "shadow-sm"
                        )}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "px-4 md:px-6 py-2 md:py-2.5 rounded-lg",
                        "bg-brand-orange text-white font-semibold",
                        "hover:bg-brand-orange/90 transition-all duration-300",
                        "shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
                        "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
                        "flex items-center justify-center gap-1.5",
                        "text-xs md:text-sm uppercase tracking-wide",
                        "min-w-[100px] sm:min-w-[110px]"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs text-center">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              )}
            </div>

            {!showResult && (
              <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                {[
                  { icon: "✈️", text: "Exclusive Travel Deals" },
                  { icon: "📧", text: "Weekly Destination Guides" },
                  { icon: "🎁", text: "Special Member Offers" },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex flex-col items-center text-center p-3 md:p-4",
                      "bg-gray-50 rounded-lg md:rounded-xl",
                      "border border-gray-100",
                      "transition-all duration-300 hover:bg-gray-100 hover:border-gray-200",
                      "hover:transform hover:-translate-y-0.5",
                      "shadow-sm hover:shadow-md"
                    )}
                  >
                    <div className="text-2xl md:text-3xl mb-1.5">{benefit.icon}</div>
                    <p className="text-gray-700 text-xs md:text-sm font-medium">{benefit.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

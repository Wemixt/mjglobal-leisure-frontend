"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsSubmitting(false);
    setEmail("");

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section className="relative w-full py-10 md:py-12 lg:py-14 bg-[#FAF9F6] overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-brand-orange/5 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Main Content Card with Enhanced Shadow */}
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl shadow-gray-300/60 border-2 border-gray-200/80 p-6 md:p-8 lg:p-10 backdrop-blur-sm">
            {/* Header Section */}
            <div className="text-center mb-6 md:mb-8 space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-orange/10 mb-3">
                <Mail className="w-6 h-6 md:w-7 md:h-7 text-brand-orange" />
              </div>
              
              <p className="text-brand-orange text-xs md:text-sm italic tracking-wide" style={{ fontFamily: 'cursive' }}>
                Stay Connected
              </p>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black tracking-tight">
                Subscribe to Our Newsletter
              </h2>
              
              <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                Get exclusive travel tips, special offers, and updates about new destinations delivered straight to your inbox.
              </p>
            </div>

            {/* Newsletter Form */}
            <div className="max-w-xl mx-auto">
              {isSubmitted ? (
                <div className="bg-green-50 rounded-xl md:rounded-2xl p-6 md:p-8 text-center border border-green-100">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-green-100 mb-3">
                    <CheckCircle2 className="w-7 h-7 md:w-8 md:h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                    Thank You for Subscribing!
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    We've sent a confirmation email. Check your inbox to complete your subscription.
                  </p>
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

            {/* Benefits List */}
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
                  <p className="text-gray-700 text-xs md:text-sm font-medium">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

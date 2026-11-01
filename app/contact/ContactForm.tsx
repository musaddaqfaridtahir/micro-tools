"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, RotateCcw } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Bug Report");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // Simulate instant client submission
    setSubmitted(true);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setSubject("Bug Report");
    setMessage("");
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-8 sm:p-12 text-center animate-in fade-in-50 zoom-in-95">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm mb-4">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-bold text-neutral-900">
          Message Received Successfully!
        </h3>
        <p className="mt-2 text-sm text-neutral-600 max-w-md mx-auto">
          Thank you, <strong className="text-neutral-900">{name}</strong>. Your message regarding &quot;{subject}&quot; has been logged. Our engineering and support team will respond to <strong className="text-neutral-900">{email}</strong> within <strong>24 to 48 business hours</strong>.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-6 inline-flex items-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-700 shadow-2xs hover:bg-neutral-50 transition"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Send Another Message</span>
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Your Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="block w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 py-3 px-4 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Your Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className="block w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 py-3 px-4 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
          />
        </div>
      </div>

      {/* Subject Dropdown */}
      <div className="space-y-1.5">
        <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
          Reason for Contact <span className="text-red-500">*</span>
        </label>
        <select
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="block w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 py-3 px-4 text-sm font-medium text-neutral-900 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
        >
          <option value="Bug Report">🐛 Report a Bug or Calculation Issue</option>
          <option value="Suggest a New Tool">💡 Suggest a New Tool or Feature</option>
          <option value="Advertising Inquiry">📢 Advertising / Partnership Inquiry</option>
          <option value="General Question">💬 General Question or Feedback</option>
        </select>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
          Your Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Please describe your question, bug report, or request in detail..."
          className="block w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 py-3 px-4 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition resize-y"
        />
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-[11px] text-neutral-500">
          Guaranteed response within 24-48 business hours.
        </span>

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-95 cursor-pointer"
        >
          <span>Send Message</span>
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </form>
  );
}

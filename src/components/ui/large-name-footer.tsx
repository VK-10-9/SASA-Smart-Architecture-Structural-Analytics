"use client";
import Link from "next/link";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, User, Phone, Globe, MessageSquare, Send } from "lucide-react";
import React, { useState } from "react";

function Footer() {
  // Contact form state and logic
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("All fields are required.");
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Your message has been sent!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="pt-12 px-4 md:px-6 bg-background">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <Icons.logo className="icon-class w-8" />
              <h2 className="text-lg font-bold">SASA</h2>
            </Link>
            <h1 className="dark:text-gray-300 mt-4">
              Smart Architecture & Structural Analytics
            </h1>
            <p className="text-sm dark:text-gray-400 mt-5">
              © {new Date().getFullYear()} SASA. All rights reserved.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Tools</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/force-calculator" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Force Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/design-scenario" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Design Scenario
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/examples" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Examples
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Contact Form & Details Section - now broken out of card */}
        <div className="mt-6 mb-0 flex flex-col md:flex-row gap-6 items-stretch w-full">
          {/* Contact Details */}
          <div className="flex-1 flex flex-col justify-between gap-4 border-b md:border-b-0 md:border-r border-neutral-800 pb-6 md:pb-0 md:pr-6">
            <h3 className="text-2xl font-bold text-neutral-200 mb-2 flex items-center gap-2">
              <Globe className="w-6 h-6 text-white" /> Contact Details
            </h3>
            <ul className="space-y-2 text-base">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-white" />
                <a href="https://wa.me/917011329518" target="_blank" rel="noopener noreferrer" className="underline text-primary hover:text-primary/80 font-semibold">7011329518</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white" />
                <a href="mailto:info@sasa.engineer" className="underline text-primary hover:text-primary/80 font-semibold">info@sasa.engineer</a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-white" />
                <span className="font-bold text-neutral-200">Instagram:</span>
                <a href="https://www.instagram.com/sasa.engineer/" target="_blank" rel="noopener noreferrer" className="underline text-white hover:text-neutral-300 transition-colors">@sasa.engineer</a>
              </li>
            </ul>
          </div>
          {/* Contact Form */}
          <div className="flex-1 flex flex-col justify-center md:pl-6">
            <h4 className="text-2xl font-semibold text-neutral-200 mb-1 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-white" /> Send us a message
            </h4>
            <p className="text-neutral-400 text-sm mb-4">Fill out the form and we’ll get back to you soon.</p>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="relative">
                <Label htmlFor="name" className="text-neutral-200">Name</Label>
                <span className="absolute left-3 top-9 text-white pointer-events-none">
                  <User className="w-4 h-4" />
                </span>
                <Input type="text" name="name" id="name" placeholder="Your Name" className="bg-neutral-800 border border-neutral-700 text-neutral-200 pl-10 focus:ring-2 focus:ring-white focus:bg-neutral-900 transition-all rounded-lg shadow-inner" value={form.name} onChange={handleChange} disabled={loading} />
              </div>
              <div className="relative">
                <Label htmlFor="email" className="text-neutral-200">Email</Label>
                <span className="absolute left-3 top-9 text-white pointer-events-none">
                  <Mail className="w-4 h-4" />
                </span>
                <Input type="email" name="email" id="email" placeholder="Email" className="bg-neutral-800 border border-neutral-700 text-neutral-200 pl-10 focus:ring-2 focus:ring-white focus:bg-neutral-900 transition-all rounded-lg shadow-inner" value={form.email} onChange={handleChange} disabled={loading} />
              </div>
              <div className="relative">
                <Label htmlFor="message" className="text-neutral-200">Message</Label>
                <span className="absolute left-3 top-9 text-white pointer-events-none">
                  <MessageSquare className="w-4 h-4" />
                </span>
                <Textarea name="message" id="message" placeholder="Type your message here." className="bg-neutral-800 border border-neutral-700 text-neutral-200 pl-10 focus:ring-2 focus:ring-white focus:bg-neutral-900 transition-all rounded-lg shadow-inner" value={form.message} onChange={handleChange} disabled={loading} />
              </div>
              <Button type="submit" className="w-full mt-2 bg-white text-black font-semibold flex items-center justify-center gap-2 transition-all group disabled:opacity-60 rounded-lg shadow hover:bg-neutral-200" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2"><Send className="w-4 h-4 animate-spin" /> Sending...</span>
                ) : (
                  <><Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />Send Message</>
                )}
              </Button>
              {success && <div className="text-green-400 text-sm mt-2 drop-shadow">{success}</div>}
              {error && <div className="text-red-400 text-sm mt-2 drop-shadow">{error}</div>}
            </form>
          </div>
        </div>
        <div className="w-full flex mt-4 items-center justify-center">
          <h1 className="text-center text-3xl md:text-5xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-700 to-neutral-900 select-none">
            SASA
          </h1>
        </div>
      </div>
    </footer>
  );
}

export { Footer }; 
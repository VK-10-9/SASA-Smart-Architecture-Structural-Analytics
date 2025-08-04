import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mail, UserPlus, Phone, Globe } from "lucide-react";

interface Contact2Props {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  web?: { label: string; url: string };
}

export const Contact2 = ({
  title = "Contact Us",
  description = "We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
  phone = "7011329518",
  email = "info@sasa.engineer",
  web = { label: "@sasa.engineer (Instagram)", url: "https://www.instagram.com/sasa.engineer/" },
}: Contact2Props) => {
  // Form logic and API call are kept for future use, but not rendered
  // const [form, setForm] = useState({ ... });
  // ... (all form logic remains here, but is not used)

  return (
    <section className="py-24 min-h-[60vh] flex justify-center items-center bg-gradient-to-br from-blue-950 via-neutral-950 to-slate-900">
      <Card className="w-full max-w-2xl mx-auto rounded-3xl border-none shadow-2xl bg-white/10 backdrop-blur-xl p-0 overflow-hidden">
        <div className="flex flex-col gap-0 p-10 bg-gradient-to-br from-blue-900/60 via-transparent to-slate-900/60">
          <CardHeader className="p-0 pb-4 border-none">
            <CardTitle className="text-4xl font-bold text-white mb-2 flex items-center gap-2 drop-shadow-lg">
              <UserPlus className="w-8 h-8 text-blue-400" /> {title}
            </CardTitle>
            <p className="text-muted-foreground text-base mb-4">{description}</p>
          </CardHeader>
          <CardContent className="p-0">
            <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-300" /> Contact Details
            </h3>
            <ul className="space-y-2 text-base">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-300" />
                <span className="font-bold text-white">Phone:</span>
                <span className="text-muted-foreground">{phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-300" />
                <span className="font-bold text-white">Email:</span>
                <a href={`mailto:${email}`} className="underline text-blue-200 hover:text-blue-100 transition-colors">{email}</a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-300" />
                <span className="font-bold text-white">Instagram:</span>
                <a href={web.url} target="_blank" rel="noopener noreferrer" className="underline text-blue-200 hover:text-blue-100 transition-colors">{web.label}</a>
              </li>
            </ul>
          </CardContent>
        </div>
      </Card>
    </section>
  );
}; 
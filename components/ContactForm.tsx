"use client";
import { useState } from "react";
import { useT } from "@/lib/i18n";
import { Button } from "./primitives";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const t = useT();
  const [state, setState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");

    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setState("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setState("idle"), 5000);
      } else {
        setState("error");
        setTimeout(() => setState("idle"), 3000);
      }
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[640px] space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          name="name"
          placeholder={t({ es: "Tu nombre", en: "Your name" })}
          value={formData.name}
          onChange={handleChange}
          required
          className="px-3 py-2 border border-border bg-bg text-text text-[13px] placeholder:text-text-dim focus:outline-none focus:border-accent"
        />
        <input
          type="email"
          name="email"
          placeholder={t({ es: "Tu email", en: "Your email" })}
          value={formData.email}
          onChange={handleChange}
          required
          className="px-3 py-2 border border-border bg-bg text-text text-[13px] placeholder:text-text-dim focus:outline-none focus:border-accent"
        />
      </div>

      <input
        type="text"
        name="subject"
        placeholder={t({ es: "Asunto", en: "Subject" })}
        value={formData.subject}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-border bg-bg text-text text-[13px] placeholder:text-text-dim focus:outline-none focus:border-accent"
      />

      <textarea
        name="message"
        placeholder={t({ es: "Mensaje...", en: "Message..." })}
        value={formData.message}
        onChange={handleChange}
        required
        rows={6}
        className="w-full px-3 py-2 border border-border bg-bg text-text text-[13px] placeholder:text-text-dim focus:outline-none focus:border-accent resize-none"
      />

      <div className="flex items-center justify-between">
        <div className="text-[11px] text-text-dim font-mono">
          {t({ es: "Tu información es segura", en: "Your info is secure" })}
        </div>
        <Button
          kind="primary"
          disabled={state === "loading"}
          type="submit"
          className="disabled:opacity-50"
        >
          {state === "loading" && t({ es: "Enviando...", en: "Sending..." })}
          {state === "success" && t({ es: "¡Enviado!", en: "Sent!" })}
          {state === "error" && t({ es: "Error", en: "Error" })}
          {state === "idle" && t({ es: "Enviar", en: "Send" })}
        </Button>
      </div>

      {state === "success" && (
        <div className="p-3 border border-ok bg-ok/5 text-ok text-[13px]">
          {t({ es: "Gracias por tu mensaje. Me pondré en contacto pronto.", en: "Thanks for your message. I'll get back to you soon." })}
        </div>
      )}

      {state === "error" && (
        <div className="p-3 border border-warn bg-warn/5 text-warn text-[13px]">
          {t({ es: "Error al enviar. Intenta más tarde o envía a lcorrea@botinfy.com", en: "Error sending. Try again later or email lcorrea@botinfy.com" })}
        </div>
      )}
    </form>
  );
}

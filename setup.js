#!/usr/bin/env node

/**
 * Manual setup script for Portfolio
 * Run this after installation to complete the file structure
 * 
 * Usage: node setup.js
 */

const fs = require("fs");
const path = require("path");

const BASE_DIR = __dirname;

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
}

function moveFile(src, dest) {
  if (!fs.existsSync(src)) {
    console.error(`❌ Source file not found: ${src}`);
    return false;
  }
  
  // Ensure destination directory exists
  const destDir = path.dirname(dest);
  ensureDir(destDir);
  
  // Move file
  fs.renameSync(src, dest);
  console.log(` Moved ${src} → ${dest}`);
  return true;
}

function createFileFromTemplate(dest, template) {
  const destDir = path.dirname(dest);
  ensureDir(destDir);
  
  fs.writeFileSync(dest, template, "utf-8");
  console.log(` Created at : ${dest}`);
}

async function main() {
  console.log(" Portfolio Setup Script\n");

  // Step 1: Create dynamic route directory
  const projectDetailSrc = path.join(BASE_DIR, "app", "projects", "detail.tsx");
  const projectDetailDest = path.join(BASE_DIR, "app", "projects", "[id]", "page.tsx");
  
  console.log("Step 1: Setting up project detail page...");
  if (moveFile(projectDetailSrc, projectDetailDest)) {
    // Clean up
    if (fs.existsSync(projectDetailSrc)) {
      fs.unlinkSync(projectDetailSrc);
    }
  }

  // Step 2: Create contact page
  console.log("\nStep 2: Creating contact page...");
  const contactPageDest = path.join(BASE_DIR, "app", "contact", "page.tsx");
  const contactPageTemplate = `"use client";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import { useT, STR } from "@/lib/i18n";
import { ABOUT } from "@/lib/about";

export default function ContactPage() {
  const t = useT();

  return (
    <main id="main" className="bg-bg min-h-screen">
      <Navbar />

      {/* HEADER */}
      <section className="px-14 pt-12 pb-8 border-b border-border">
        <div className="font-mono text-[11px] text-text-dim tracking-[0.14em] mb-3.5">/contact</div>
        <h1 className="m-0 text-[52px] font-medium tracking-[-0.015em] mb-4">
          {t({ es: "Contacto", en: "Contact" })}<span className="text-accent">.</span>
        </h1>
        <p className="m-0 max-w-[640px] text-[15px] text-text-mute leading-[1.55]">
          {t({
            es: "¿Tienes un proyecto en mente o solo quieres charlar? Me gustaría escuchar tu idea.",
            en: "Have a project in mind or just want to chat? I'd love to hear from you.",
          })}
        </p>
      </section>

      {/* CONTENT */}
      <section className="px-14 py-12 border-b border-border">
        <div className="grid grid-cols-2 gap-16 max-w-[1000px]">
          {/* FORM */}
          <div>
            <div className="font-mono text-[12px] text-text-dim tracking-[0.12em] mb-6 uppercase">
              {t({ es: "Formulario", en: "Form" })}
            </div>
            <ContactForm />
          </div>

          {/* DIRECT CONTACT */}
          <div>
            <div className="font-mono text-[12px] text-text-dim tracking-[0.12em] mb-6 uppercase">
              {t({ es: "Contacto Directo", en: "Direct Contact" })}
            </div>

            <div className="space-y-6 text-[13px]">
              {/* EMAIL */}
              <div className="border-l-2 border-accent pl-4">
                <div className="font-mono text-text-dim text-[11px] uppercase tracking-[0.08em]">
                  {t({ es: "Email de trabajo", en: "Work Email" })}
                </div>
                <a
                  href={\`mailto:\${ABOUT.contact.emailWork}\`}
                  className="text-accent hover:underline text-[15px] mt-1 inline-block"
                >
                  {ABOUT.contact.emailWork}
                </a>
                <p className="text-text-mute text-[12px] mt-2">
                  {t({
                    es: "Mejor opción para propuestas profesionales",
                    en: "Best for business inquiries",
                  })}
                </p>
              </div>

              {/* PHONE */}
              <div className="border-l-2 border-ok pl-4">
                <div className="font-mono text-text-dim text-[11px] uppercase tracking-[0.08em]">
                  {t({ es: "Teléfono / WhatsApp", en: "Phone / WhatsApp" })}
                </div>
                <a
                  href={\`https://wa.me/\${ABOUT.contact.phone.replace(/\\\\D/g, "")}\`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ok hover:underline text-[15px] mt-1 inline-block"
                >
                  {ABOUT.contact.phone}
                </a>
                <p className="text-text-mute text-[12px] mt-2">
                  {t({
                    es: "Respuestas más rápidas por WhatsApp",
                    en: "Faster responses via WhatsApp",
                  })}
                </p>
              </div>

              {/* SOCIAL */}
              <div className="border-l-2 border-border-hi pl-4 pt-4">
                <div className="font-mono text-text-dim text-[11px] uppercase tracking-[0.08em] mb-3">
                  {t({ es: "Redes sociales", en: "Social Media" })}
                </div>
                <div className="flex gap-4">
                  <a
                    href={ABOUT.contact.github}
                    target="_blank"
                    rel="noreferrer"
                    className="pf-link text-[12px]"
                  >
                    GitHub
                  </a>
                  <a
                    href={ABOUT.contact.gitlab}
                    target="_blank"
                    rel="noreferrer"
                    className="pf-link text-[12px]"
                  >
                    GitLab
                  </a>
                  <a
                    href={ABOUT.contact.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="pf-link text-[12px]"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* AVAILABILITY */}
            <div className="mt-8 p-4 border border-border-hi bg-surface/50">
              <div className="font-mono text-[11px] text-text-dim tracking-[0.06em] uppercase mb-2">
                ⏰ {t({ es: "Disponibilidad", en: "Availability" })}
              </div>
              <p className="text-[12px] text-text m-0">
                {t({
                  es: "Horario: LUN - VIE, 09:00 - 18:00 (UTC-4)",
                  en: "Schedule: MON - FRI, 09:00 - 18:00 (UTC-4)",
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border px-14 py-7 flex justify-between items-center bg-surface">
        <div className="font-mono text-[11px] text-text-dim">{t(STR.footerNote)}</div>
        <div className="flex gap-3.5">
          <a className="font-mono pf-link text-[12px]" href="https://github.com/lpzzlnrd">
            github
          </a>
          <a className="font-mono pf-link text-[12px]" href="https://gitlab.com/lpzzlnrd">
            gitlab
          </a>
          <a className="font-mono pf-link text-[12px]" href={\`mailto:\${ABOUT.contact.emailWork}\`}>
            email
          </a>
        </div>
      </footer>
    </main>
  );
}
`;
  
  createFileFromTemplate(contactPageDest, contactPageTemplate);

  // Step 3: Create images dor the dir
  console.log("\nStep 3: Creating images directory structure...");
  const imagesDir = path.join(BASE_DIR, "public", "images", "projects");
  ensureDir(imagesDir);

  // Step 4: Summary off the setup
  
  console.log("\n Setup complete!\n");
  console.log("Next steps:");
  console.log("  1. Add project images to public/images/projects/[project-id]/");
  console.log("  2. Update project gallery arrays in lib/projects.ts");
  console.log("  3. Run: npm run build && npm run dev");
  console.log("  4. Visit http://localhost:3000/projects/botinfy-auth to test");
}

main().catch(console.error);

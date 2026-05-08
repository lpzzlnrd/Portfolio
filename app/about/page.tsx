"use client";
import { Navbar } from "@/components/Navbar";
import { useT, STR } from "@/lib/i18n";
import { ABOUT } from "@/lib/about";

export default function AboutPage() {
  const t = useT();
  const hasHobbies = ABOUT.hobbies.es.trim().length > 0 || ABOUT.hobbies.en.trim().length > 0;

  return (
    <main id="main" className="bg-bg min-h-screen">
      <Navbar />

      {/* HEADER */}
      <section className="px-14 pt-12 pb-8 border-b border-border relative">
        <div className="font-mono text-[11px] text-text-dim tracking-[0.14em] mb-3.5">/about</div>
        <h1 className="m-0 text-[52px] font-medium tracking-[-0.015em]">
          {t(STR.aboutH)}<span className="text-accent">.</span>
        </h1>
        <p className="mt-3.5 mb-0 max-w-[640px] text-[15px] text-text-mute leading-[1.55]">
          {t(STR.aboutSub)}
        </p>

        <div className="font-mono absolute top-6 right-8 text-[11px] text-text-faint text-right leading-[1.6]">
          <div>{ABOUT.name}</div>
          <div>{t(ABOUT.location)} · {ABOUT.timezone}</div>
          <div className="mt-1">{"─".repeat(18)}</div>
        </div>
      </section>

      {/* INTRO */}
      <Section n="01" label={t(STR.secIntro)}>
        <div className="grid grid-cols-[1fr_auto] gap-10 items-start">
          <p className="m-0 max-w-[720px] text-[17px] text-text leading-[1.6]">
            {t(ABOUT.intro)}
          </p>
          <div className="font-mono text-[12px] text-text-mute leading-[1.7] border border-border bg-surface px-4 py-3 min-w-[260px]">
            <div className="text-text-dim text-[10.5px] tracking-[0.12em] uppercase mb-2">
              {t(STR.aboutH)}
            </div>
            <div>{ABOUT.alias} · /dev</div>
            <div className="text-text-mute">{t(ABOUT.status)}</div>
          </div>
        </div>
      </Section>

      {/* STACK */}
      <Section n="02" label={t(STR.secStack)}>
        <div className="grid grid-cols-2 gap-x-10 gap-y-6">
          <StackGroup label={t(STR.stackLanguages)} items={ABOUT.stack.languages} />
          <StackGroup label={t(STR.stackFrameworks)} items={ABOUT.stack.frameworks} />
          <StackGroup label={t(STR.stackDatabases)} items={ABOUT.stack.databases} />
          <StackGroup label={t(STR.stackTools)} items={ABOUT.stack.tools} />
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section n="03" label={t(STR.secExperience)}>
        <div className="flex flex-col">
          {ABOUT.experience.map((job, i) => (
            <div
              key={i}
              className="grid grid-cols-[180px_1fr] gap-8 py-5 border-t border-border first:border-t-0"
            >
              <div className="font-mono text-[11px] text-text-dim tracking-[0.06em] leading-[1.6]">
                <div className="text-text">{t(job.period)}</div>
                <div className="mt-1">{job.company}</div>
              </div>
              <div>
                <div className="text-[16px] font-medium">{t(job.role)}</div>
                <ul className="mt-2 mb-0 pl-0 list-none flex flex-col gap-1.5">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="text-[14px] text-text-mute leading-[1.55] flex gap-2.5">
                      <span className="text-accent shrink-0">→</span>
                      <span>{t(b)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* EDUCATION */}
      <Section n="04" label={t(STR.secEducation)}>
        <div className="flex flex-col">
          {ABOUT.education.map((ed, i) => (
            <div
              key={i}
              className="grid grid-cols-[180px_1fr] gap-8 py-5 border-t border-border first:border-t-0"
            >
              <div className="font-mono text-[11px] text-text-dim tracking-[0.06em]">
                {t(ed.period)}
              </div>
              <div>
                <div className="text-[15px] font-medium">{t(ed.title)}</div>
                <div className="text-[13px] text-text-mute mt-0.5">{t(ed.institution)}</div>
                {ed.detail && (
                  <div className="font-mono text-[11px] text-text-dim mt-1.5 tracking-[0.04em]">
                    {t(ed.detail)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* LANGUAGES */}
      <Section n="05" label={t(STR.secLanguages)}>
        <div className="flex gap-10 flex-wrap">
          {ABOUT.languages.map((lng, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="font-mono text-[11px] text-text-dim tracking-[0.12em] uppercase">
                {t(lng.name)}
              </div>
              <div className="text-[15px] text-text">{t(lng.level)}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* HOBBIES — user-filled */}
      <Section n="06" label={t(STR.secHobbies)}>
        {hasHobbies ? (
          <p className="m-0 max-w-[720px] text-[16px] text-text leading-[1.6] whitespace-pre-line">
            {t(ABOUT.hobbies)}
          </p>
        ) : (
          <div className="border border-dashed border-border-hi p-5 max-w-[720px]">
            <div className="font-mono text-[10.5px] text-warn uppercase tracking-[0.12em]">
              {t({ es: "Pendiente", en: "Pending" })}
            </div>
            <p className="m-0 mt-2 text-[14px] text-text-mute leading-[1.6]">
              {t(STR.hobbiesPlaceholder)}
            </p>
          </div>
        )}
      </Section>

      {/* CONTACT */}
      <Section id="contact" n="07" label={t(STR.secContact)}>
        <div className="grid grid-cols-2 gap-x-10 gap-y-3 max-w-[720px] font-mono text-[13px]">
          <ContactRow label="email" value={ABOUT.contact.emailPersonal} href={`mailto:${ABOUT.contact.emailPersonal}`} />
          <ContactRow label="work"  value={ABOUT.contact.emailWork}     href={`mailto:${ABOUT.contact.emailWork}`} />
          <ContactRow label="github"   value="@lpzzlnrd" href={ABOUT.contact.github} />
          <ContactRow label="gitlab"   value="@lpzzlnrd" href={ABOUT.contact.gitlab} />
          <ContactRow label="phone"    value={ABOUT.contact.phone} />
          <ContactRow label="instagram" value="@lpzlnrd" href={ABOUT.contact.instagram} />
        </div>
      </Section>

      <footer className="border-t border-border px-14 py-7 flex justify-between items-center bg-surface">
        <div className="font-mono text-[11px] text-text-dim">{t(STR.footerNote)}</div>
        <div className="flex gap-3.5">
          <a className="font-mono pf-link text-[12px]" href="https://github.com/lpzzlnrd">github</a>
          <a className="font-mono pf-link text-[12px]" href="https://gitlab.com/lpzzlnrd">gitlab</a>
          <a className="font-mono pf-link text-[12px]" href={`mailto:${ABOUT.contact.emailWork}`}>email</a>
        </div>
      </footer>
    </main>
  );
}

function Section({ id, n, label, children }: { id?: string; n: string; label: string; children: React.ReactNode }) {
  return (
    <section id={id} className="px-14 py-10 border-b border-border scroll-mt-24">
      <div className="font-mono text-[11px] tracking-[0.14em] text-text mb-6 flex items-center gap-3">
        <span className="text-accent">{n}</span>
        <span className="text-text-dim">//</span>
        <span>{label}</span>
        <span className="flex-1 h-px bg-border ml-2" />
      </div>
      {children}
    </section>
  );
}

function StackGroup({ label, items }: { label: string; items: readonly string[] }) {
  return (
    <div>
      <div className="font-mono text-[11px] text-text-dim tracking-[0.12em] uppercase mb-2">
        {label}
      </div>
      <div className="flex flex-wrap gap-x-2.5 gap-y-1 font-mono text-[13px] text-text">
        {items.map((s, i) => (
          <span key={s} className="inline-flex items-center gap-2.5">
            {i > 0 && <span className="text-text-faint">·</span>}
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function ContactRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="flex gap-4 border-b border-border py-2">
      <span className="text-text-dim min-w-[72px] tracking-[0.06em]">{label}</span>
      {href ? (
        <a className="text-text hover:text-accent transition-colors duration-[120ms]" href={href}>
          {value}
        </a>
      ) : (
        <span className="text-text">{value}</span>
      )}
    </div>
  );
}

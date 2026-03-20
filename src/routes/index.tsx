import { createFileRoute, Link } from '@tanstack/react-router'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react'

export const Route = createFileRoute('/')({
  component: Landing,
})

const GITHUB_URL = 'https://github.com/quinnsprouse/typling'

function Landing() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <LazyMotion features={domAnimation}>
      <div className="flex min-h-dvh flex-col items-center bg-[#FAFAF8] text-[#141414] font-mono antialiased">
        {/* Nav */}
        <nav className="flex w-full items-center justify-between px-20 py-8">
          <span className="text-[13px] uppercase tracking-[0.15em]">
            typling
          </span>
          <div className="flex items-center gap-8">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-widest text-[#141414]/60 transition-colors duration-150 hover:text-[#141414]"
            >
              github
            </a>
            <Link
              to="/app"
              className="flex items-center justify-center rounded-[4px] bg-[#141414] px-5 py-2.5 text-[11px] uppercase tracking-widest text-[#FAFAF8] transition-opacity duration-150 hover:opacity-80"
            >
              launch app
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <m.main
          className="flex w-full flex-col items-center gap-8 px-20 pb-28 pt-36"
          initial={
            prefersReducedMotion
              ? false
              : { opacity: 0, y: 16, filter: 'blur(8px)' }
          }
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ type: 'spring', duration: 0.6, bounce: 0.1 }}
        >
          <h1 className="text-[96px] leading-none tracking-[-0.02em]">
            typling
          </h1>
          <p className="max-w-[520px] text-center text-[18px] leading-[1.6] tracking-[0.02em] text-[#141414]/60">
            type to remember. a keyboard-driven tool for memorizing scripture,
            quotes, code, or anything you want to internalize.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/app"
              className="flex items-center justify-center rounded-[4px] bg-[#141414] px-8 py-3.5 text-[13px] uppercase tracking-widest text-[#FAFAF8] transition-opacity duration-150 hover:opacity-80"
            >
              start typing
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-[4px] border border-[#141414]/10 px-8 py-3.5 text-[13px] uppercase tracking-widest text-[#141414]/60 transition-colors duration-150 hover:text-[#141414]"
            >
              view on github
            </a>
          </div>
        </m.main>

        {/* Features */}
        <section className="flex w-full flex-col items-center gap-16 px-20 py-24">
          <div className="flex flex-col items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C45A3C]">
              features
            </span>
            <h2 className="text-center text-[36px] leading-[1.2] tracking-[-0.01em]">
              built for focus.
            </h2>
          </div>
          <div className="flex w-full max-w-[1080px] gap-12">
            <div className="flex flex-1 flex-col gap-3">
              <h3 className="text-[20px] leading-none">_keyboard</h3>
              <p className="text-[13px] leading-[1.7] text-[#141414]/60">
                real-time key highlighting. see every keystroke reflected
                on-screen. visual feedback that builds accuracy.
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <h3 className="text-[20px] leading-none">_telemetry</h3>
              <p className="text-[13px] leading-[1.7] text-[#141414]/60">
                wpm, accuracy, timer, and progress. errors count even when
                corrected. honest data about your consistency.
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <h3 className="text-[20px] leading-none">_library</h3>
              <p className="text-[13px] leading-[1.7] text-[#141414]/60">
                folders, titles, inline editing. organize passages by book,
                topic, or whatever makes sense to you.
              </p>
            </div>
          </div>
        </section>

        {/* Telemetry showcase */}
        <section className="flex w-full flex-col items-center px-20 pb-20 pt-10">
          <div className="relative flex w-full max-w-[860px] flex-wrap items-center gap-12 rounded-[4px] border border-[#141414]/8 px-6 py-4">
            <span className="absolute -top-2 left-4 bg-[#FAFAF8] px-2 text-[9px] uppercase tracking-[0.25em] text-[#141414]/30">
              telemetry
            </span>
            <div className="flex items-center gap-2.5 text-[12px]">
              <span className="uppercase tracking-widest text-[#141414]/35">
                wpm
              </span>
              <span>{'████████████░░░░░░░░'}</span>
              <span>072</span>
            </div>
            <div className="flex items-center gap-2.5 text-[12px]">
              <span className="uppercase tracking-widest text-[#141414]/35">
                acc
              </span>
              <span>{'██████████████████░░'}</span>
              <span>094%</span>
            </div>
            <div className="flex items-center gap-2.5 text-[12px]">
              <span className="uppercase tracking-widest text-[#141414]/35">
                tmr
              </span>
              <span>00:47</span>
            </div>
            <div className="flex items-center gap-2.5 text-[12px]">
              <span className="uppercase tracking-widest text-[#141414]/35">
                prg
              </span>
              <span>100%</span>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="flex w-full flex-col items-center gap-6 px-20 py-24">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C45A3C]">
            privacy
          </span>
          <h2 className="text-center text-[36px] leading-[1.2] tracking-[-0.01em]">
            100% local storage.
          </h2>
          <p className="max-w-[480px] text-center text-[14px] leading-[1.7] text-[#141414]/60">
            your library, themes, and progress never leave your browser. no
            accounts. no tracking. no server. just you and the text.
          </p>
        </section>

        {/* Bottom CTA */}
        <section className="flex w-full flex-col items-center px-20 pb-10 pt-12">
          <div className="relative flex w-full max-w-[860px] items-center gap-10 rounded-[4px] border border-[#141414]/6 px-10 py-7">
            <span className="absolute -top-2 left-4 bg-[#FAFAF8] px-2 text-[9px] uppercase tracking-[0.25em] text-[#C45A3C]">
              ready?
            </span>
            <p className="flex-1 text-[15px] text-[#141414]/60">
              type to remember. start building muscle memory today.
            </p>
            <Link
              to="/app"
              className="flex shrink-0 items-center justify-center rounded-[4px] bg-[#141414] px-7 py-3 text-[12px] uppercase tracking-widest text-[#FAFAF8] transition-opacity duration-150 hover:opacity-80"
            >
              launch typling
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex w-full items-center justify-between border-t border-[#141414]/3 px-20 pb-12 pt-10">
          <span className="text-[11px] tracking-widest text-[#141414]/40">
            typling — type to remember
          </span>
          <div className="flex items-center gap-6">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-widest text-[#141414]/40 transition-colors duration-150 hover:text-[#141414]/70"
            >
              github
            </a>
            <span className="text-[11px] tracking-widest text-[#141414]/40">
              mit license
            </span>
          </div>
        </footer>
      </div>
    </LazyMotion>
  )
}

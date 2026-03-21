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
        <nav className="flex w-full items-center justify-between px-5 py-6 sm:px-10 md:px-20 md:py-8">
          <span className="text-[13px] uppercase tracking-[0.15em]">
            typling
          </span>
          <div className="flex items-center gap-4 sm:gap-8">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-[11px] uppercase tracking-widest text-[#141414]/60 sm:block"
            >
              github
            </a>
            <Link
              to="/app"
              className="flex min-h-[44px] items-center justify-center rounded-[4px] bg-[#141414] px-5 py-2.5 text-[11px] uppercase tracking-widest text-[#FAFAF8]"
            >
              launch app
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <m.main
          className="flex w-full flex-col items-center gap-6 px-5 pb-16 pt-20 sm:gap-8 sm:px-10 sm:pb-28 sm:pt-36 md:px-20"
          initial={
            prefersReducedMotion
              ? false
              : { opacity: 0, y: 16, filter: 'blur(8px)' }
          }
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ type: 'spring', duration: 0.6, bounce: 0.1 }}
        >
          <h1 className="text-[48px] leading-none tracking-[-0.02em] sm:text-[72px] md:text-[96px]">
            typling
          </h1>
          <p className="max-w-[520px] text-center text-[15px] leading-[1.6] tracking-[0.02em] text-[#141414]/60 sm:text-[18px]">
            type to remember. a keyboard-driven tool for memorizing scripture,
            quotes, code, or anything you want to internalize.
          </p>
          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Link
              to="/app"
              className="flex min-h-[48px] w-full items-center justify-center rounded-[4px] bg-[#141414] px-8 py-3.5 text-[13px] uppercase tracking-widest text-[#FAFAF8] sm:w-auto"
            >
              start typing
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[48px] w-full items-center justify-center rounded-[4px] border border-[#141414]/10 px-8 py-3.5 text-[13px] uppercase tracking-widest text-[#141414]/60 sm:w-auto"
            >
              view on github
            </a>
          </div>
        </m.main>

        {/* Features */}
        <section className="flex w-full flex-col items-center gap-10 px-5 py-16 sm:gap-16 sm:px-10 sm:py-24 md:px-20">
          <div className="flex flex-col items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C45A3C]">
              features
            </span>
            <h2 className="text-center text-[28px] leading-[1.2] tracking-[-0.01em] sm:text-[36px]">
              built for focus.
            </h2>
          </div>
          <div className="flex w-full max-w-[1080px] flex-col gap-8 sm:flex-row sm:gap-12">
            <div className="flex flex-1 flex-col gap-3">
              <h3 className="text-[18px] leading-none sm:text-[20px]">
                _keyboard
              </h3>
              <p className="text-[13px] leading-[1.7] text-[#141414]/60">
                real-time key highlighting. see every keystroke reflected
                on-screen. visual feedback that builds accuracy.
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <h3 className="text-[18px] leading-none sm:text-[20px]">
                _telemetry
              </h3>
              <p className="text-[13px] leading-[1.7] text-[#141414]/60">
                wpm, accuracy, timer, and progress. errors count even when
                corrected. honest data about your consistency.
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <h3 className="text-[18px] leading-none sm:text-[20px]">
                _library
              </h3>
              <p className="text-[13px] leading-[1.7] text-[#141414]/60">
                folders, titles, inline editing. organize passages by book,
                topic, or whatever makes sense to you.
              </p>
            </div>
          </div>
        </section>

        {/* Telemetry showcase */}
        <section className="flex w-full flex-col items-center px-5 pb-16 pt-4 sm:px-10 sm:pb-20 sm:pt-10 md:px-20">
          <div className="relative flex w-full max-w-[860px] flex-wrap items-center gap-x-8 gap-y-2 overflow-hidden rounded-[4px] border border-[#141414]/8 px-4 py-4 sm:gap-x-12 sm:px-6">
            <span className="absolute -top-2 left-4 bg-[#FAFAF8] px-2 text-[9px] uppercase tracking-[0.25em] text-[#141414]/30">
              telemetry
            </span>
            <div className="flex items-center gap-2.5 text-[11px] sm:text-[12px]">
              <span className="uppercase tracking-widest text-[#141414]/35">
                wpm
              </span>
              <span className="hidden sm:inline">{'████████████░░░░░░░░'}</span>
              <span>072</span>
            </div>
            <div className="flex items-center gap-2.5 text-[11px] sm:text-[12px]">
              <span className="uppercase tracking-widest text-[#141414]/35">
                acc
              </span>
              <span className="hidden sm:inline">{'██████████████████░░'}</span>
              <span>094%</span>
            </div>
            <div className="flex items-center gap-2.5 text-[11px] sm:text-[12px]">
              <span className="uppercase tracking-widest text-[#141414]/35">
                tmr
              </span>
              <span>00:47</span>
            </div>
            <div className="flex items-center gap-2.5 text-[11px] sm:text-[12px]">
              <span className="uppercase tracking-widest text-[#141414]/35">
                prg
              </span>
              <span>100%</span>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="flex w-full flex-col items-center gap-5 px-5 py-16 sm:gap-6 sm:px-10 sm:py-24 md:px-20">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C45A3C]">
            privacy
          </span>
          <h2 className="text-center text-[28px] leading-[1.2] tracking-[-0.01em] sm:text-[36px]">
            100% local storage.
          </h2>
          <p className="max-w-[480px] text-center text-[13px] leading-[1.7] text-[#141414]/60 sm:text-[14px]">
            your library, themes, and progress never leave your browser. no
            accounts. no tracking. no server. just you and the text.
          </p>
        </section>

        {/* Bottom CTA */}
        <section className="flex w-full flex-col items-center px-5 pb-10 pt-8 sm:px-10 sm:pt-12 md:px-20">
          <div className="relative flex w-full max-w-[860px] flex-col gap-5 rounded-[4px] border border-[#141414]/6 px-5 py-6 sm:flex-row sm:items-center sm:gap-10 sm:px-10 sm:py-7">
            <span className="absolute -top-2 left-4 bg-[#FAFAF8] px-2 text-[9px] uppercase tracking-[0.25em] text-[#C45A3C]">
              ready?
            </span>
            <p className="flex-1 text-[14px] text-[#141414]/60 sm:text-[15px]">
              type to remember. start building muscle memory today.
            </p>
            <Link
              to="/app"
              className="flex min-h-[44px] shrink-0 items-center justify-center rounded-[4px] bg-[#141414] px-7 py-3 text-[12px] uppercase tracking-widest text-[#FAFAF8]"
            >
              launch typling
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex w-full flex-col items-center gap-4 border-t border-[#141414]/3 px-5 py-8 sm:flex-row sm:justify-between sm:px-10 sm:pb-12 sm:pt-10 md:px-20">
          <span className="text-[11px] tracking-widest text-[#141414]/40">
            typling — type to remember
          </span>
          <div className="flex items-center gap-6">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-widest text-[#141414]/40"
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

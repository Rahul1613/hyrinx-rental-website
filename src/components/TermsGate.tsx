'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const STORAGE_KEY = 'hyrinx-terms-accepted'
const TERMS_VERSION = '2026-09'
const EXEMPT_PREFIXES = ['/admin', '/terms', '/privacy']

export default function TermsGate() {
  const pathname = usePathname()
  const [checked, setChecked] = useState(false)
  const [declined, setDeclined] = useState(false)
  const [visible, setVisible] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      setVisible(window.localStorage.getItem(STORAGE_KEY) !== TERMS_VERSION)
    } catch {
      setVisible(true)
    }
  }, [])

  const exempt = EXEMPT_PREFIXES.some((prefix) => pathname?.startsWith(prefix))

  useEffect(() => {
    if (!visible || exempt) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusables = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled])'
        ) ?? []
      )

    const focusFirst = () => (focusables()[0] ?? dialogRef.current)?.focus()
    focusFirst()

    const onFocusIn = (event: FocusEvent) => {
      if (!dialogRef.current?.contains(event.target as Node)) focusFirst()
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const items = focusables()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      if (!dialogRef.current?.contains(active)) {
        event.preventDefault()
        first.focus()
      } else if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('focusin', onFocusIn)
    document.addEventListener('keydown', onKeyDown, true)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('focusin', onFocusIn)
      document.removeEventListener('keydown', onKeyDown, true)
    }
  }, [visible, exempt])

  if (!visible || exempt) return null

  const accept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, TERMS_VERSION)
    } catch {
      /* storage unavailable — acceptance applies to this session only */
    }
    setVisible(false)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm px-4 py-6">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-gate-title"
        tabIndex={-1}
        className="w-full max-w-2xl max-h-full overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col"
      >
        <div className="px-6 py-5 border-b border-slate-200">
          <h2 id="terms-gate-title" className="text-xl font-extrabold text-slate-900">Terms &amp; Conditions</h2>
          <p className="text-sm text-slate-500 mt-1">
            Please read and accept before using the Hyrinx website.
          </p>
        </div>

        <div className="px-6 py-5 overflow-y-auto text-sm leading-relaxed text-slate-700 space-y-4">
          <p>
            Hyrinx rents temporary websites for events, businesses, institutions, and personal projects.
            By continuing you confirm that you have read and agree to the Terms &amp; Conditions,
            User Agreement, and Rules of Usage.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Rented websites stay online only for the duration selected at checkout and are deactivated on expiry unless extended.</li>
            <li>You are responsible for the content you publish and must not use a rented website for unlawful, fraudulent, or abusive purposes.</li>
            <li>Hyrinx may suspend any website that violates these rules, without refund.</li>
            <li>Payments, refunds, and support are handled as described in the full Terms &amp; Conditions.</li>
            <li>Your personal data is processed as described in our Privacy Policy.</li>
          </ul>
          <p>
            Read the full{' '}
            <Link href="/terms" className="font-semibold text-blue-600 underline" target="_blank">
              Terms &amp; Conditions
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="font-semibold text-blue-600 underline" target="_blank">
              Privacy Policy
            </Link>
            .
          </p>
          {declined && (
            <p className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-amber-800">
              You must accept the Terms &amp; Conditions to use the Hyrinx website. You can close this tab
              if you do not agree.
            </p>
          )}
        </div>

        <div className="px-6 py-5 border-t border-slate-200 space-y-4">
          <label className="flex items-start gap-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.checked)
                if (e.target.checked) setDeclined(false)
              }}
              className="mt-0.5 h-4 w-4 rounded border-slate-300"
            />
            <span>I have read and agree to the Terms &amp; Conditions, User Agreement and Rules of Usage.</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              type="button"
              onClick={() => setDeclined(true)}
              className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={accept}
              disabled={!checked}
              className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Accept &amp; Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

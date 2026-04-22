'use client'

import { MainLayout } from '@components/layout/MainLayout'

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="w-full max-w-2xl mx-auto border-r border-border p-6">
        <h1 className="text-2xl font-bold text-foreground mb-6">Settings</h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Account
            </h2>
            <div className="space-y-3 text-text-secondary">
              <button className="block text-left hover:text-primary transition">
                Change password
              </button>
              <button className="block text-left hover:text-primary transition">
                Email preferences
              </button>
              <button className="block text-left hover:text-primary transition">
                Privacy settings
              </button>
              <button className="block text-left text-error hover:text-error/80 transition">
                Deactivate account
              </button>
            </div>
          </section>

          <section className="pt-6 border-t border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Notifications
            </h2>
            <div className="space-y-3 text-text-secondary">
              <label className="flex items-center gap-3 cursor-pointer hover:bg-card-bg p-2 rounded transition">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>Message notifications</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:bg-card-bg p-2 rounded transition">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>Like notifications</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:bg-card-bg p-2 rounded transition">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>Follow notifications</span>
              </label>
            </div>
          </section>

          <section className="pt-6 border-t border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Display
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="theme" defaultChecked />
                <span className="text-text-secondary">Light Mode</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="theme" />
                <span className="text-text-secondary">Dark Mode</span>
              </label>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  )
}

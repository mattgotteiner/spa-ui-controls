import { useState } from 'react'
import { useTheme } from '../theme/useTheme'
import { AppShell } from '../components/AppShell'
import { Banner } from '../components/Banner'
import { Button } from '../components/Button'
import { FormField } from '../components/FormField'
import { Panel } from '../components/Panel'
import { SettingsButton } from '../components/SettingsButton'
import { SettingsDrawer } from '../components/SettingsDrawer'
import { Sidebar } from '../components/Sidebar'
import { ThemeToggle } from '../components/ThemeToggle'
import { TopBar } from '../components/TopBar'
import './demo.css'

function DemoSurface() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const { resolvedTheme, setTheme, theme } = useTheme()

  return (
    <>
      <Sidebar
        description="A reusable left-side navigation shell for compact SPAs."
        isOpen={isNavigationOpen}
        onClose={() => setIsNavigationOpen(false)}
        title="Navigation"
      >
        <div className="demo-nav">
          <button className="demo-nav__item" type="button">
            Dashboard
          </button>
          <button className="demo-nav__item" type="button">
            Experiments
          </button>
          <button className="demo-nav__item" type="button">
            Settings
          </button>
        </div>
      </Sidebar>

      <SettingsDrawer
        footer={
          <div className="demo-drawer-footer">
            <Button variant="secondary" onClick={() => setIsSettingsOpen(false)}>
              Close
            </Button>
            <Button onClick={() => setIsSettingsOpen(false)}>Save defaults</Button>
          </div>
        }
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      >
        <FormField hint="Keep theme handling identical across all apps." label="Theme">
          <ThemeToggle onChange={setTheme} value={theme} />
        </FormField>

        <FormField hint="Settings-specific controls stay app-owned." htmlFor="demo-endpoint" label="Example input">
          <input className="spa-input" id="demo-endpoint" placeholder="https://example.internal" type="url" />
        </FormField>

        <FormField htmlFor="demo-mode" label="Example select">
          <select className="spa-input" id="demo-mode" defaultValue="balanced">
            <option value="balanced">Balanced</option>
            <option value="compact">Compact</option>
            <option value="dense">Dense</option>
          </select>
        </FormField>
      </SettingsDrawer>

      <AppShell
        header={
          <TopBar
            leading={
              <Button variant="ghost" onClick={() => setIsNavigationOpen(true)}>
                Menu
              </Button>
            }
            subtitle={`Resolved theme: ${resolvedTheme}`}
            title="spa-ui-controls"
            trailing={
              <div className="demo-topbar-actions">
                <ThemeToggle onChange={setTheme} value={theme} />
                <SettingsButton variant="topbar" onClick={() => setIsSettingsOpen(true)} />
              </div>
            }
          />
        }
      >
        <Banner
          actions={<Button size="sm">Review package API</Button>}
          heading="Shared controls, not app-specific logic"
          tone="info"
        >
          This package packages the shell, drawers, theme system, and shared styling
          patterns used across your SPA test apps.
        </Banner>

        <div className="demo-grid">
          <Panel>
            <div className="demo-section-header">
              <h2>Shell and layout primitives</h2>
              <p>Reusable header, content, panel, and action patterns.</p>
            </div>
            <div className="demo-button-row">
              <Button>Primary action</Button>
              <Button variant="secondary">Secondary action</Button>
              <Button variant="ghost">Ghost action</Button>
              <Button variant="danger">Danger action</Button>
            </div>
          </Panel>

          <Panel>
            <div className="demo-section-header">
              <h2>Theme and sidebar controls</h2>
              <p>Built from the common patterns in `text-audio` and `responses-chat-2`.</p>
            </div>
            <div className="demo-stack">
              <ThemeToggle onChange={setTheme} value={theme} />
              <div className="demo-button-row">
                <Button variant="secondary" onClick={() => setIsNavigationOpen(true)}>
                  Open left sidebar
                </Button>
                <Button variant="secondary" onClick={() => setIsSettingsOpen(true)}>
                  Open settings drawer
                </Button>
              </div>
            </div>
          </Panel>

          <Panel>
            <div className="demo-section-header">
              <h2>Tokens and visual language</h2>
              <p>Canonical spacing, radii, surfaces, borders, and semantic colors.</p>
            </div>
            <div className="demo-token-grid">
              <div className="demo-token demo-token--primary">Primary</div>
              <div className="demo-token demo-token--surface">Surface</div>
              <div className="demo-token demo-token--success">Success</div>
              <div className="demo-token demo-token--warning">Warning</div>
            </div>
          </Panel>
        </div>
      </AppShell>
    </>
  )
}

export function DemoApp() {
  return <DemoSurface />
}

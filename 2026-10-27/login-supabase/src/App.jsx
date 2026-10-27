import { useEffect, useState } from 'react'
import Login from './Login.jsx'
import { supabase } from './supabaseClient.js'
import './App.css'

function BrandPanel() {
  return (
    <aside className="brand-panel">
      <div className="brand-orbit brand-orbit-one" aria-hidden="true" />
      <div className="brand-orbit brand-orbit-two" aria-hidden="true" />

      <a className="brand-lockup" href="#inicio" aria-label="Nexo, inicio">
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 40 40">
            <path d="M20 4.5 24.1 16l11.4 4-11.4 4L20 35.5 16 24l-11.5-4L16 16l4-11.5Z" />
            <circle cx="31.5" cy="9" r="2.3" />
          </svg>
        </span>
        <span>NEXO</span>
      </a>

      <div className="brand-copy">
        <p className="brand-overline">TU ESPACIO, A TU RITMO</p>
        <h1>Un buen comienzo para lo que sigue.</h1>
        <p className="brand-description">
          Entra a tu cuenta de forma sencilla y segura. Tu espacio te espera.
        </p>
        <div className="brand-stamp" aria-hidden="true">
          <span className="stamp-line" />
          <span>HECHO PARA SEGUIR</span>
        </div>
      </div>

      <div className="brand-footer">
        <span>ACCESO PERSONAL</span>
        <span className="footer-separator" aria-hidden="true">/</span>
        <span>SESIÓN SEGURA</span>
      </div>
    </aside>
  )
}

function SetupNotice() {
  return (
    <div className="setup-notice" role="status">
      <span className="setup-icon" aria-hidden="true">i</span>
      <div>
        <h2>Conecta tu proyecto</h2>
        <p>
          Para activar el acceso, crea <code>.env.local</code> desde <code>.env.example</code>
          y añade la URL y la clave pública de Supabase.
        </p>
        <p className="setup-detail">
          No subas claves privadas ni <code>service_role</code> al repositorio.
        </p>
      </div>
    </div>
  )
}

function SessionCard({ session, onLogout, logoutError, isLoggingOut }) {
  const email = session.user.email ?? 'Cuenta conectada'
  const initial = email.slice(0, 1).toUpperCase()

  return (
    <div className="session-card">
      <div className="section-kicker">
        <span className="status-dot" aria-hidden="true" />
        SESIÓN ACTIVA
      </div>
      <div className="session-avatar" aria-hidden="true">{initial}</div>
      <h2 className="form-title">Ya estás dentro.</h2>
      <p className="form-description">Tu sesión está conectada y lista para continuar.</p>
      <div className="account-row">
        <span className="account-label">CUENTA</span>
        <span className="account-email">{email}</span>
      </div>
      {logoutError && <p className="form-feedback feedback-error" role="alert">{logoutError}</p>}
      <button className="primary-button logout-button" type="button" onClick={onLogout} disabled={isLoggingOut}>
        {isLoggingOut ? 'Cerrando sesión…' : 'Cerrar sesión'}
        {!isLoggingOut && <span className="button-arrow" aria-hidden="true">↗</span>}
      </button>
    </div>
  )
}

function App() {
  const [session, setSession] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [logoutError, setLogoutError] = useState('')

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false)
      return undefined
    }

    let isMounted = true
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (isMounted) setSession(nextSession)
    })

    supabase.auth.getSession()
      .then(({ data, error }) => {
        if (error) throw error
        if (isMounted) setSession(data.session)
      })
      .catch(() => {
        if (isMounted) setSession(null)
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    if (!supabase) return

    setLogoutError('')
    setIsLoggingOut(true)
    const { error } = await supabase.auth.signOut()
    if (error) setLogoutError('No pudimos cerrar la sesión. Inténtalo otra vez.')
    setIsLoggingOut(false)
  }

  return (
    <main className="app-shell" id="inicio">
      <BrandPanel />
      <section className="auth-panel" aria-label="Acceso a Nexo">
        <div className="auth-panel-topline">
          <span>ESPACIO PERSONAL</span>
          <span className="topline-mark" aria-hidden="true">N.</span>
        </div>

        <div className="auth-panel-body">
          {!supabase ? (
            <SetupNotice />
          ) : isLoading ? (
            <div className="loading-state" role="status" aria-live="polite">
              <span className="spinner spinner-dark" aria-hidden="true" />
              <span>Revisando tu sesión…</span>
            </div>
          ) : session ? (
            <SessionCard
              session={session}
              onLogout={handleLogout}
              logoutError={logoutError}
              isLoggingOut={isLoggingOut}
            />
          ) : (
            <Login onLogin={setSession} supabase={supabase} />
          )}
        </div>

        <div className="auth-panel-footer">
          <span>¿NECESITAS AYUDA?</span>
          <span className="footer-note">Vuelve a intentarlo en cualquier momento.</span>
        </div>
      </section>
    </main>
  )
}

export default App

import { useState } from 'react'

const messagesByCode = {
  invalid_credentials: 'El correo o la contraseña no coinciden. Revisa los datos e inténtalo de nuevo.',
  email_not_confirmed: 'Confirma tu correo desde el enlace que te enviamos antes de iniciar sesión.',
  user_already_exists: 'Ya existe una cuenta con ese correo. Inicia sesión en su lugar.',
  weak_password: 'Elige una contraseña más segura de al menos 6 caracteres.',
  over_email_send_rate_limit: 'Se enviaron demasiados correos. Espera un momento e inténtalo de nuevo.',
}

function getFriendlyMessage(error) {
  if (error?.code && messagesByCode[error.code]) return messagesByCode[error.code]

  const message = error?.message?.toLowerCase() ?? ''
  if (message.includes('already registered') || message.includes('already exists')) {
    return messagesByCode.user_already_exists
  }
  if (message.includes('email not confirmed')) return messagesByCode.email_not_confirmed
  if (message.includes('invalid login credentials')) return messagesByCode.invalid_credentials

  return 'No pudimos completar la solicitud. Comprueba tus datos y vuelve a intentarlo.'
}

export default function Login({ onLogin, supabase }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMsg('')
    setNotice('')

    if (!supabase) {
      setErrorMsg('Falta conectar las variables de entorno de Supabase.')
      return
    }

    setLoading(true)
    try {
      const { data, error } = isSignUp
        ? await supabase.auth.signUp({ email: email.trim(), password })
        : await supabase.auth.signInWithPassword({ email: email.trim(), password })

      if (error) throw error

      if (data.session) {
        onLogin(data.session)
      } else if (isSignUp) {
        setNotice('Tu registro está listo. Revisa tu correo para confirmar la cuenta y después podrás iniciar sesión.')
        setIsSignUp(false)
        setPassword('')
      }
    } catch (error) {
      setErrorMsg(getFriendlyMessage(error))
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setIsSignUp((current) => !current)
    setErrorMsg('')
    setNotice('')
    setPassword('')
  }

  return (
    <div className="auth-content">
      <div className="section-kicker">
        <span className="status-dot" aria-hidden="true" />
        ACCESO PERSONAL
      </div>
      <h2 className="form-title">{isSignUp ? 'Crea tu cuenta.' : 'Qué gusto verte.'}</h2>
      <p className="form-description">
        {isSignUp
          ? 'Un par de datos y tendrás tu espacio listo.'
          : 'Ingresa tus datos para continuar donde lo dejaste.'}
      </p>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="field-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="nombre@correo.com"
            autoComplete="email"
            inputMode="email"
            required
            disabled={loading}
          />
        </div>

        <div className="field-group">
          <div className="field-label-row">
            <label htmlFor="password">Contraseña</label>
            <span className="field-hint">Mínimo 6 caracteres</span>
          </div>
          <div className="password-wrap">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Escribe tu contraseña"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              minLength={6}
              required
              disabled={loading}
            />
            <button
              className="password-toggle"
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              aria-pressed={showPassword}
              disabled={loading}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>

        {errorMsg && (
          <p className="form-feedback feedback-error" role="alert">
            <span aria-hidden="true">!</span>
            {errorMsg}
          </p>
        )}
        {notice && (
          <p className="form-feedback feedback-success" role="status">
            <span aria-hidden="true">✓</span>
            {notice}
          </p>
        )}

        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Procesando…
            </>
          ) : isSignUp ? (
            'Crear cuenta'
          ) : (
            'Iniciar sesión'
          )}
          {!loading && <span className="button-arrow" aria-hidden="true">↗</span>}
        </button>
      </form>

      <div className="mode-switch">
        <span>{isSignUp ? '¿Ya tienes cuenta?' : '¿Primera vez por aquí?'}</span>
        <button type="button" onClick={toggleMode} disabled={loading}>
          {isSignUp ? 'Inicia sesión' : 'Crea una cuenta'}
        </button>
      </div>

      <div className="security-note">
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M10 2.5 16 5v4.4c0 4.1-2.5 6.8-6 8.1-3.5-1.3-6-4-6-8.1V5l6-2.5Z" />
          <path d="m7.4 9.8 1.7 1.7 3.7-3.8" />
        </svg>
        <span>Tu acceso se gestiona de forma segura con Supabase Auth.</span>
      </div>
    </div>
  )
}

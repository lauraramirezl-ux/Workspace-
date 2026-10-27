import { useCallback, useEffect, useState } from 'react'

const emptyForm = { nombre: '', descripcion: '', precio: '' }

function formatPrice(value) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
  }).format(Number(value) || 0)
}

export default function Productos({ session, supabase }) {
  const [productos, setProductos] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [notice, setNotice] = useState('')

  const cargarProductos = useCallback(async () => {
    setLoading(true)
    setErrorMsg('')

    const { data, error } = await supabase
      .from('productos')
      .select('id, user_id, nombre, descripcion, precio, created_at')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })

    if (error) {
      setErrorMsg('No pudimos cargar tus productos. Comprueba que la tabla y sus políticas estén configuradas.')
    } else {
      setProductos(data ?? [])
    }
    setLoading(false)
  }, [session.user.id, supabase])

  useEffect(() => {
    cargarProductos()
  }, [cargarProductos])

  const limpiarFormulario = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMsg('')
    setNotice('')

    const nombre = form.nombre.trim()
    const precio = Number(form.precio)
    if (!nombre) {
      setErrorMsg('Escribe un nombre para el producto.')
      return
    }
    if (!Number.isFinite(precio) || precio < 0) {
      setErrorMsg('El precio debe ser un número mayor o igual a 0.')
      return
    }

    setSaving(true)
    const payload = {
      nombre,
      descripcion: form.descripcion.trim() || null,
      precio,
    }
    const result = editingId
      ? await supabase.from('productos').update(payload).eq('id', editingId).eq('user_id', session.user.id)
      : await supabase.from('productos').insert({ ...payload, user_id: session.user.id })

    if (result.error) {
      setErrorMsg('No pudimos guardar el producto. Inténtalo de nuevo.')
    } else {
      limpiarFormulario()
      setNotice(editingId ? 'Producto actualizado correctamente.' : 'Producto creado correctamente.')
      await cargarProductos()
    }
    setSaving(false)
  }

  const handleEditar = (producto) => {
    setEditingId(producto.id)
    setForm({
      nombre: producto.nombre,
      descripcion: producto.descripcion ?? '',
      precio: String(producto.precio ?? ''),
    })
    setNotice('')
    setErrorMsg('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleEliminar = async (producto) => {
    if (!window.confirm(`¿Seguro que deseas eliminar “${producto.nombre}”?`)) return

    setDeletingId(producto.id)
    setErrorMsg('')
    setNotice('')
    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id', producto.id)
      .eq('user_id', session.user.id)

    if (error) {
      setErrorMsg('No pudimos eliminar el producto. Inténtalo de nuevo.')
    } else {
      setProductos((current) => current.filter((item) => item.id !== producto.id))
      if (editingId === producto.id) limpiarFormulario()
      setNotice('Producto eliminado correctamente.')
    }
    setDeletingId(null)
  }

  return (
    <div className="products-page">
      <div className="products-heading">
        <div>
          <div className="section-kicker">
            <span className="status-dot" aria-hidden="true" />
            ESPACIO PERSONAL
          </div>
          <h2 className="products-title">Mis productos.</h2>
          <p className="products-description">Administra tu catálogo desde un solo lugar.</p>
        </div>
        <div className="products-count" aria-label={`${productos.length} productos`}>
          <strong>{productos.length}</strong>
          <span>{productos.length === 1 ? 'producto' : 'productos'}</span>
        </div>
      </div>

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="product-form-header">
          <h3>{editingId ? 'Editar producto' : 'Nuevo producto'}</h3>
          {editingId && (
            <button className="text-button" type="button" onClick={limpiarFormulario} disabled={saving}>
              Cancelar edición
            </button>
          )}
        </div>
        <div className="product-fields">
          <div className="field-group">
            <label htmlFor="nombre">Nombre</label>
            <input id="nombre" name="nombre" type="text" value={form.nombre} onChange={handleChange} placeholder="Ej. Café de especialidad" required disabled={saving} maxLength={120} />
          </div>
          <div className="field-group">
            <label htmlFor="descripcion">Descripción <span className="optional-label">Opcional</span></label>
            <input id="descripcion" name="descripcion" type="text" value={form.descripcion} onChange={handleChange} placeholder="Una breve descripción" disabled={saving} maxLength={500} />
          </div>
          <div className="field-group price-field">
            <label htmlFor="precio">Precio</label>
            <div className="price-input-wrap">
              <span aria-hidden="true">$</span>
              <input id="precio" name="precio" type="number" min="0" step="0.01" value={form.precio} onChange={handleChange} placeholder="0.00" required disabled={saving} />
            </div>
          </div>
        </div>
        <button className="primary-button product-submit" type="submit" disabled={saving}>
          {saving ? <><span className="spinner" aria-hidden="true" /> Guardando…</> : editingId ? 'Guardar cambios' : 'Crear producto'}
          {!saving && <span className="button-arrow" aria-hidden="true">↗</span>}
        </button>
      </form>

      {errorMsg && <p className="form-feedback feedback-error products-feedback" role="alert"><span aria-hidden="true">!</span>{errorMsg}</p>}
      {notice && <p className="form-feedback feedback-success products-feedback" role="status"><span aria-hidden="true">✓</span>{notice}</p>}

      <section className="products-list" aria-labelledby="products-list-title">
        <div className="list-heading">
          <h3 id="products-list-title">Tu catálogo</h3>
          <span>{loading ? 'Cargando…' : 'Ordenado por más reciente'}</span>
        </div>
        {loading ? (
          <div className="empty-products"><span className="spinner spinner-dark" aria-hidden="true" /> Cargando productos…</div>
        ) : productos.length === 0 ? (
          <div className="empty-products">
            <span className="empty-icon" aria-hidden="true">＋</span>
            <strong>Aún no tienes productos</strong>
            <span>El primero que crees aparecerá aquí.</span>
          </div>
        ) : (
          <div className="product-table-wrap">
            <table className="product-table">
              <thead>
                <tr><th>Producto</th><th>Descripción</th><th>Precio</th><th><span className="sr-only">Acciones</span></th></tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td><strong>{producto.nombre}</strong></td>
                    <td className="product-description-cell">{producto.descripcion || '—'}</td>
                    <td className="product-price">{formatPrice(producto.precio)}</td>
                    <td className="product-actions">
                      <button className="icon-action" type="button" onClick={() => handleEditar(producto)} disabled={saving || deletingId !== null} aria-label={`Editar ${producto.nombre}`}>Editar</button>
                      <button className="icon-action danger-action" type="button" onClick={() => handleEliminar(producto)} disabled={saving || deletingId !== null} aria-label={`Eliminar ${producto.nombre}`}>{deletingId === producto.id ? '…' : 'Eliminar'}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

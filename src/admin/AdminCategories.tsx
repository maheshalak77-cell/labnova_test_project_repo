import { FormEvent, useEffect, useState } from "react";
import { adminApi } from "../lib/api";
import type { Category } from "../lib/types";
import { Button, Icon } from "../components/ui";

export function AdminCategories({ token }: { token: string }) {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [newName, setNewName] = useState("");
  const [busy, setBusy] = useState(false);

  const load = () => adminApi.getCategories(token).then(setCategories).catch((err) => setError(err instanceof Error ? err.message : "Could not load categories."));

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const addCategory = async (e: FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setBusy(true);
    setError(null);
    try {
      await adminApi.createCategory(token, newName.trim());
      setNewName("");
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create category.");
    } finally {
      setBusy(false);
    }
  };

  const saveEdit = async (id: number) => {
    if (!editValue.trim()) return;
    setBusy(true);
    setError(null);
    try {
      await adminApi.updateCategory(token, id, editValue.trim());
      setEditingId(null);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update category.");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: number) => {
    if (!window.confirm("Delete this category? Products must be moved or deleted first.")) return;
    setBusy(true);
    setError(null);
    try {
      await adminApi.deleteCategory(token, id);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete category.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-page__head"><h1>Categories</h1><p>The four product categories customers filter by on the Products page.</p></header>

      {error && <p className="form-error"><Icon name="alert" size={16}/> {error}</p>}

      <form className="admin-inline-form" onSubmit={addCategory}>
        <input placeholder="New category name" value={newName} onChange={(e) => setNewName(e.target.value)} />
        <Button type="submit" disabled={busy || !newName.trim()}>Add category <Icon name="plus" size={16}/></Button>
      </form>

      {!categories ? (
        <div className="catalog-state">Loading categories…</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Slug</th><th>Products</th><th></th></tr></thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id}>
                  <td>
                    {editingId === c.id ? (
                      <input autoFocus value={editValue} onChange={(e) => setEditValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && saveEdit(c.id)} />
                    ) : (
                      c.name
                    )}
                  </td>
                  <td><code>{c.slug}</code></td>
                  <td>{c.product_count ?? 0}</td>
                  <td className="admin-table__actions">
                    {editingId === c.id ? (
                      <>
                        <button className="admin-link" onClick={() => saveEdit(c.id)}>Save</button>
                        <button className="admin-link" onClick={() => setEditingId(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button className="admin-icon-btn" onClick={() => { setEditingId(c.id); setEditValue(c.name); }} aria-label="Edit"><Icon name="edit" size={16}/></button>
                        <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => remove(c.id)} aria-label="Delete"><Icon name="trash" size={16}/></button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

import { Fragment, useEffect, useMemo, useState } from "react";
import { adminApi } from "../lib/api";
import type { AdminQuote } from "../lib/types";
import { Icon, money } from "../components/ui";

const STATUS_OPTIONS = ["new", "contacted", "closed"] as const;

export function AdminQuotes({ token }: { token: string }) {
  const [quotes, setQuotes] = useState<AdminQuote[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const load = () =>
    adminApi
      .getQuotes(token)
      .then(setQuotes)
      .catch((err) =>
        setError(
          err instanceof Error ? err.message : "Could not load quotations.",
        ),
      );

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const filtered = useMemo(
    () =>
      (quotes || []).filter(
        (q) =>
          (statusFilter === "all" || q.status === statusFilter) &&
          (typeFilter === "all" || q.type === typeFilter),
      ),
    [quotes, statusFilter, typeFilter],
  );

  const changeStatus = async (id: number, status: string) => {
    setQuotes(
      (prev) =>
        prev &&
        prev.map((q) =>
          q.id === id ? { ...q, status: status as AdminQuote["status"] } : q,
        ),
    );
    try {
      await adminApi.updateQuoteStatus(token, id, status);
    } catch {
      load(); // revert to server truth if the update failed
    }
  };

  if (error)
    return (
      <div className="catalog-state catalog-state--error">
        <Icon name="alert" size={18} /> {error}
      </div>
    );
  if (!quotes) return <div className="catalog-state">Loading quotations…</div>;

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <div>
          <h1>Quotation Requests</h1>
          <p>Every request submitted through the Contact Us page.</p>
        </div>
        <div className="admin-page__filters">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="admin-select"
          >
            <option value="all">All types</option>
            <option value="quote">Quotes</option>
            <option value="question">Questions</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-select"
          >
            <option value="all">All statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s[0].toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </header>

      {!filtered.length ? (
        <div className="catalog-state">
          No quotation requests match these filters.
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Type</th>
                <th>Items</th>
                <th>Total</th>
                <th>Email</th>
                <th>Received</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((q) => (
                <Fragment key={q.id}>
                  <tr className={expanded === q.id ? "is-expanded" : ""}>
                    <td>
                      <strong>{q.fullName}</strong>
                      <br />
                      <small>{q.email}</small>
                    </td>
                    <td>
                      {q.type === "question" ? (
                        <span className="pill pill--type-question">
                          Question
                        </span>
                      ) : (
                        <span className="pill pill--type-quote">Quote</span>
                      )}
                    </td>
                    <td>
                      {q.items.length} product{q.items.length === 1 ? "" : "s"}
                    </td>
                    <td>{money(q.total)}</td>
                    <td>
                      {q.emailSent ? (
                        <span className="pill pill--ok">Sent</span>
                      ) : (
                        <span className="pill pill--warn">Not sent</span>
                      )}
                    </td>
                    <td>
                      {new Date(q.createdAt).toLocaleString("en-AU", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>
                      <select
                        value={q.status}
                        onChange={(e) => changeStatus(q.id, e.target.value)}
                        className={`admin-select admin-select--status status-${q.status}`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s[0].toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        className="admin-link"
                        onClick={() =>
                          setExpanded(expanded === q.id ? null : q.id)
                        }
                      >
                        {expanded === q.id ? "Hide" : "View"}
                      </button>
                    </td>
                  </tr>
                  {expanded === q.id && (
                    <tr className="admin-table__detail-row">
                      <td colSpan={8}>
                        <div className="quote-detail">
                          {q.phone && (
                            <p>
                              <strong>Phone:</strong> {q.phone}
                            </p>
                          )}
                          {q.message && (
                            <p>
                              <strong>Message:</strong> {q.message}
                            </p>
                          )}
                          <table className="admin-subtable">
                            <thead>
                              <tr>
                                <th>Product</th>
                                <th>Size</th>
                                <th>Qty</th>
                                <th>Unit price</th>
                                <th>Line total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {q.items.map((item, i) => (
                                <tr key={i}>
                                  <td>
                                    {item.productName}
                                    {item.sku ? (
                                      <small> · {item.sku}</small>
                                    ) : null}
                                  </td>
                                  <td>{item.size || "—"}</td>
                                  <td>{item.quantity}</td>
                                  <td>{money(item.unitPrice)}</td>
                                  <td>{money(item.lineTotal)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

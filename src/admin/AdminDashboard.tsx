import { useEffect, useState } from "react";
import { adminApi } from "../lib/api";
import type { AdminStats } from "../lib/types";
import { Icon } from "../components/ui";
import { BarChart, DonutChart } from "./charts";

const dayLabel = (iso: string) => new Date(iso).toLocaleDateString("en-AU", { day: "2-digit", month: "short" });

export function AdminDashboard({ token }: { token: string }) {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApi
      .getStats(token)
      .then(setStats)
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load dashboard stats."));
  }, [token]);

  if (error) return <div className="catalog-state catalog-state--error"><Icon name="alert" size={18}/> {error}</div>;
  if (!stats) return <div className="catalog-state">Loading dashboard…</div>;

  return (
    <div className="admin-page">
      <header className="admin-page__head"><h1>Dashboard</h1><p>An overview of quotation activity and catalogue size.</p></header>

      <div className="stat-cards">
        <div className="stat-card"><Icon name="mail" size={20}/><strong>{stats.totalQuotes}</strong><span>Total quotations</span></div>
        <div className="stat-card stat-card--accent"><Icon name="alert" size={20}/><strong>{stats.newQuotes}</strong><span>New / unactioned</span></div>
        <div className="stat-card"><Icon name="box" size={20}/><strong>{stats.totalProducts}</strong><span>Active products</span></div>
        <div className="stat-card"><Icon name="tag" size={20}/><strong>{stats.totalCategories}</strong><span>Categories</span></div>
      </div>

      <div className="admin-grid">
        <section className="admin-card admin-card--wide">
          <h2>Quotation requests — last 14 days</h2>
          <BarChart data={stats.quotesByDay.map((d) => ({ label: dayLabel(d.day), value: d.count }))} />
        </section>

        <section className="admin-card">
          <h2>Status breakdown</h2>
          <DonutChart data={stats.quotesByStatus.map((s) => ({ label: s.status, value: s.count }))} />
        </section>

        <section className="admin-card">
          <h2>Most requested products</h2>
          <BarChart
            data={stats.topProducts.map((p) => ({ label: p.name, value: p.units }))}
            color="var(--sky)"
            formatValue={(v) => `${v} units`}
          />
        </section>

        <section className="admin-card">
          <h2>Products per category</h2>
          <BarChart data={stats.productsByCategory.map((c) => ({ label: c.name, value: c.count }))} color="var(--navy)" />
        </section>
      </div>
    </div>
  );
}

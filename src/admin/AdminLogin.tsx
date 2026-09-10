import { FormEvent, useState } from "react";
import { adminApi } from "../lib/api";
import { Button, Icon } from "../components/ui";

export function AdminLogin({ onLogin }: { onLogin: (token: string) => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      const { token } = await adminApi.login(String(data.get("username") || ""), String(data.get("password") || ""));
      onLogin(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="admin-login">
      <form className="admin-login__card" onSubmit={submit}>
        <div className="admin-login__mark"><Icon name="lock" size={22}/></div>
        <span className="eyebrow">LabNova Scientific</span>
        <h1>Admin Sign In</h1>
        <p>Authorised staff only. Contact your administrator if you need access.</p>
        <label>Username<input name="username" required autoFocus placeholder="admin"/></label>
        <label>Password<input name="password" required type="password" placeholder="••••••••"/></label>
        {error && <p className="form-error"><Icon name="alert" size={16}/> {error}</p>}
        <Button type="submit" className="admin-login__submit" disabled={submitting}>{submitting ? "Signing in…" : "Sign In"} <Icon name="arrow"/></Button>
      </form>
    </main>
  );
}

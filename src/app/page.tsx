'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [i18n, setI18n] = useState<any>({});
  const [flags, setFlags] = useState<any>({});
  const [reports, setReports] = useState<any>({});
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const tenantId = 'default';
        const businessId = '000000000000000000000001';
        
        const [i18nRes, flagsRes, reportsRes] = await Promise.all([
          fetch('/api/i18n/ui?locales=en').then(r => r.json()).catch(() => ({})),
          fetch(`/api/flags/${tenantId}`).then(r => r.json()).catch(() => ({})),
          fetch(`/api/reports/performance-table/${businessId}`).then(r => r.json()).catch(() => ({}))
        ]);

        setI18n(i18nRes?.en || {});
        setFlags(flagsRes || {});
        setReports(reportsRes || {});
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;

  return (
    <main style={{ padding: 24 }}>
      <h1>Keephy Enhanced FE</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      <div style={{ marginBottom: 20 }}>
        <h2>i18n Status</h2>
        <p>Loaded {Object.keys(i18n).length} translation keys</p>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h2>Feature Flags</h2>
        <pre>{JSON.stringify(flags, null, 2)}</pre>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h2>Reports (via BFF)</h2>
        <pre>{JSON.stringify(reports, null, 2)}</pre>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h2>Entitlements-aware UI</h2>
        {flags.formsEnabled ? (
          <button>Create Form (enabled)</button>
        ) : (
          <button disabled>Create Form (disabled by entitlements)</button>
        )}
      </div>
    </main>
  );
}



import { useLanguage } from '../../i18n/LanguageContext';

export function Loader() {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-3 py-16 tk-ink-muted" role="status">
      <span className="h-2 w-2 animate-pulse tk-accent-bg" style={{ borderRadius: 'var(--radius)' }} />
      <span className="text-sm tracking-wide">{t('common.loading')}</span>
    </div>
  );
}

export function ErrorMessage() {
  const { t } = useLanguage();
  return (
    <div
      className="border py-8 px-6 tk-border tk-surface tk-radius"
      role="alert"
    >
      <p className="font-display text-lg mb-1">{t('common.errorTitle')}</p>
      <p className="tk-ink-muted text-sm">{t('common.errorBody')}</p>
    </div>
  );
}

export function EmptyMessage({ children }) {
  return <p className="tk-ink-muted text-sm py-8">{children}</p>;
}

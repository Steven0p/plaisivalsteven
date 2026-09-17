import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div data-theme="editorial" className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-8xl tk-accent">{t('notFound.title')}</p>
      <p className="mt-4 text-lg tk-ink-muted">{t('notFound.body')}</p>
      <Link to="/" className="mt-8 tk-accent-bg px-6 py-3 text-sm font-semibold uppercase tracking-wide tk-radius">
        {t('notFound.back')}
      </Link>
    </div>
  );
}

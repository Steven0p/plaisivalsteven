import { useLanguage } from '../../i18n/LanguageContext';
import { useProfile } from '../../context/ProfileContext';

export default function Footer() {
  const { t } = useLanguage();
  const { profile } = useProfile();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t tk-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm tk-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {profile?.full_name || t('home.placeholderName')}. {t('footer.rights')}
        </p>
        <p>{t('footer.builtWith')}</p>
      </div>
    </footer>
  );
}

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLanguage } from '../i18n/LanguageContext';
import { useProfile } from '../context/ProfileContext';
import { sendContactMessage } from '../services/contactService';
import { getSocials } from '../services/socialService';
import useFetch from '../hooks/useFetch';

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-1 text-xs font-semibold tk-accent">{error}</p>}
    </label>
  );
}

function SocialIcon({ platform }) {
  const key = (platform || '').toLowerCase();
  if (key.includes('github')) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.79-.25.79-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.21.66.8.55A10.53 10.53 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
      </svg>
    );
  }
  if (key.includes('instagram')) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (key.includes('linkedin')) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.55 4.78 5.86V21h-4v-5.5c0-1.3-.02-2.98-1.82-2.98-1.82 0-2.1 1.4-2.1 2.88V21h-4V9Z" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M10 14a4 4 0 0 0 5.66 0l2.83-2.83a4 4 0 1 0-5.66-5.66l-1.4 1.4M14 10a4 4 0 0 0-5.66 0L5.5 12.83a4 4 0 1 0 5.66 5.66l1.4-1.4" />
    </svg>
  );
}

const inputClass =
  'w-full border-[3px] tk-border bg-transparent px-4 py-3 text-base tk-ink outline-none focus:tk-accent focus:border-current transition-colors';

export default function Contact() {
  const { t } = useLanguage();
  const { profile } = useProfile();
  const { data: socials } = useFetch(() => getSocials().catch(() => []), []);
  const [status, setStatus] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    setStatus(null);
    try {
      await sendContactMessage(values);
      setStatus('success');
      reset();
    } catch {
      setStatus('failure');
    }
  };

  return (
    <div data-theme="brutalist">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-xs font-bold uppercase tracking-[0.3em] tk-accent">{t('contact.kicker')}</p>
        <h1 className="mt-3 font-display text-4xl leading-[1] sm:text-6xl sm:leading-[0.95] md:text-7xl">{t('contact.title')}</h1>
        <p className="mt-4 max-w-lg text-base tk-ink-muted">{t('contact.subtitle')}</p>

        <div className="mt-12 grid gap-12 sm:grid-cols-[1.3fr_1fr]">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            <Field label={t('contact.name')} error={errors.name && t('contact.required')}>
              <input className={inputClass} {...register('name', { required: true })} />
            </Field>

            <Field label={t('contact.email')} error={errors.email && t('contact.invalidEmail')}>
              <input
                type="email"
                className={inputClass}
                {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })}
              />
            </Field>

            <Field label={t('contact.subject')}>
              <input className={inputClass} {...register('subject')} />
            </Field>

            <Field label={t('contact.message')} error={errors.message && t('contact.required')}>
              <textarea rows={5} className={inputClass} {...register('message', { required: true })} />
            </Field>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full border-[3px] tk-border tk-accent-bg px-6 py-4 text-sm font-bold uppercase tracking-widest transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {isSubmitting ? t('contact.sending') : t('contact.send')}
            </button>

            {status === 'success' && (
              <p className="border-[3px] border-current px-4 py-3 text-sm font-semibold" role="status">
                {t('contact.success')}
              </p>
            )}
            {status === 'failure' && (
              <p
                className="border-[3px] tk-border px-4 py-3 text-sm font-semibold tk-accent"
                role="alert"
              >
                {t('contact.failure')}
              </p>
            )}
          </form>

          <aside className="border-[3px] tk-border p-6">
            <h2 className="font-display text-lg uppercase">{t('contact.social')}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {profile?.email && (
                <li>
                  <a className="underline underline-offset-4 break-all" href={`mailto:${profile.email}`}>
                    {profile.email}
                  </a>
                </li>
              )}
              {profile?.phone && <li>{profile.phone}</li>}
              {(socials || []).map((social) => (
                <li key={social.id}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 underline underline-offset-4 break-all"
                  >
                    <SocialIcon platform={social.platform} />
                    {social.platform}
                  </a>
                </li>
              ))}
              {!profile?.email && !profile?.phone && !(socials || []).length && (
                <li className="tk-ink-muted">—</li>
              )}
            </ul>
          </aside>
        </div>
      </section>
    </div>
  );
}

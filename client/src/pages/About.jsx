import { useLanguage } from '../i18n/LanguageContext';
import { useProfile } from '../context/ProfileContext';
import useFetch from '../hooks/useFetch';
import { getSkills } from '../services/skillService';
import { getExperiences } from '../services/experienceService';
import { Loader, EmptyMessage } from '../components/ui/StateViews';

function GeometricBackdrop() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="ayiti-motif" width="64" height="64" patternUnits="userSpaceOnUse">
          <path
            d="M32 0 L64 32 L32 64 L0 32 Z"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1"
          />
          <circle cx="32" cy="32" r="4" fill="var(--accent)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ayiti-motif)" />
    </svg>
  );
}

function groupByCategory(skills) {
  return skills.reduce((acc, skill) => {
    const key = skill.category || '—';
    acc[key] = acc[key] || [];
    acc[key].push(skill);
    return acc;
  }, {});
}

function formatDate(value, presentLabel) {
  if (!value) return presentLabel;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
}

export default function About() {
  const { t } = useLanguage();
  const { profile } = useProfile();
  const { data: skills, loading: skillsLoading } = useFetch(() => getSkills().catch(() => []), []);
  const { data: experiences, loading: expLoading } = useFetch(
    () => getExperiences().catch(() => []),
    []
  );

  const grouped = groupByCategory(skills || []);

  return (
    <div data-theme="ayiti">
      <section className="relative overflow-hidden border-b tk-border">
        <GeometricBackdrop />
        <div className="relative mx-auto max-w-4xl px-6 py-20">
          <p className="mb-4 text-xs font-semibold tracking-[0.3em] tk-accent">{t('about.kicker')}</p>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl">{t('about.title')}</h1>
          {profile?.bio && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed tk-ink-muted">{profile.bio}</p>
          )}
          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
            {profile?.location && (
              <div>
                <dt className="tk-ink-muted">📍</dt>
                <dd className="mt-1">{profile.location}</dd>
              </div>
            )}
            {profile?.email && (
              <div>
                <dt className="tk-ink-muted">✉</dt>
                <dd className="mt-1 break-all">{profile.email}</dd>
              </div>
            )}
            {profile?.phone && (
              <div>
                <dt className="tk-ink-muted">☎</dt>
                <dd className="mt-1">{profile.phone}</dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      <section className="mx-auto grid max-w-4xl gap-16 px-6 py-16 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl">{t('about.skills')}</h2>
          <div className="mt-6 space-y-6">
            {skillsLoading ? (
              <Loader />
            ) : Object.keys(grouped).length === 0 ? (
              <EmptyMessage>{t('about.noSkills')}</EmptyMessage>
            ) : (
              Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-xs font-semibold uppercase tracking-wide tk-ink-muted">
                    {category}
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <li
                        key={skill.id}
                        className="border px-3 py-1 text-sm tk-border tk-surface tk-radius"
                      >
                        {skill.name}
                        {skill.level && <span className="ml-2 tk-accent">· {skill.level}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl">{t('about.experience')}</h2>
          <div className="mt-6 border-l tk-border">
            {expLoading ? (
              <Loader />
            ) : !experiences || experiences.length === 0 ? (
              <EmptyMessage>{t('about.noExperience')}</EmptyMessage>
            ) : (
              experiences.map((exp) => (
                <div key={exp.id} className="relative pb-8 pl-6">
                  <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 tk-accent-bg tk-radius" />
                  <p className="text-xs uppercase tracking-wide tk-accent">
                    {formatDate(exp.start_date, t('about.present'))} —{' '}
                    {formatDate(exp.end_date, t('about.present'))}
                  </p>
                  <h3 className="mt-1 font-display text-lg">{exp.title}</h3>
                  {exp.company && <p className="tk-ink-muted text-sm">{exp.company}</p>}
                  {exp.description && (
                    <p className="mt-2 text-sm leading-relaxed tk-ink-muted">{exp.description}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

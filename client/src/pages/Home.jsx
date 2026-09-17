import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useProfile } from '../context/ProfileContext';
import useFetch from '../hooks/useFetch';
import { getProjects } from '../services/projectService';
import { Loader } from '../components/ui/StateViews';

function ProjectRow({ project, index }) {
  const { t } = useLanguage();
  return (
    <Link
      to="/projects"
      className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 border-b tk-border py-6 transition-colors hover:tk-surface sm:grid-cols-[4rem_1fr_auto] sm:px-4"
    >
      <span className="font-display text-sm tk-ink-muted">{String(index + 1).padStart(2, '0')}</span>
      <span className="font-display text-2xl leading-snug transition-transform group-hover:translate-x-1 sm:text-3xl">
        {project.title}
      </span>
      <span className="col-span-2 text-xs uppercase tracking-wide tk-ink-muted sm:col-span-1">
        {project.technologies || t('projects.stack')}
      </span>
    </Link>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const { profile, loading: profileLoading } = useProfile();
  const { data: projects, loading: projectsLoading } = useFetch(
    () => getProjects().catch(() => []),
    []
  );

  const featured = (projects || []).slice(0, 3);

  return (
    <div data-theme="editorial">
      {/* Ero */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-24">
        <div className="grid gap-12 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="mb-6 text-xs font-medium tracking-[0.3em] tk-accent">{t('home.kicker')}</p>

            {profileLoading ? (
              <Loader />
            ) : (
              <>
                <h1 className="font-display text-5xl leading-[1.05] sm:text-7xl">
                  {profile?.full_name || t('home.placeholderName')}
                </h1>
                {profile?.title && (
                  <p className="mt-4 font-display text-xl italic tk-ink-muted sm:text-2xl">
                    {profile.title}
                  </p>
                )}
                <p className="mt-6 max-w-xl text-base leading-relaxed tk-ink-muted">
                  {profile?.bio || t('home.untitledBio')}
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link
                    to="/contact"
                    className="tk-accent-bg px-6 py-3 text-sm font-semibold uppercase tracking-wide tk-radius transition-opacity hover:opacity-90"
                  >
                    {t('common.contactMe')}
                  </Link>
                  {profile?.cv_url && (
                    <a
                      href={profile.cv_url}
                      target="_blank"
                      rel="noreferrer"
                      className="border px-6 py-3 text-sm font-semibold uppercase tracking-wide tk-border tk-radius transition-colors hover:tk-surface"
                    >
                      {t('common.downloadCV')}
                    </a>
                  )}
                </div>
              </>
            )}
          </div>

          {profile?.photo && (
            <div className="hidden h-48 w-48 shrink-0 overflow-hidden rounded-full border tk-border sm:block">
              <img
                src={profile.photo}
                alt={profile.full_name || ''}
                className="h-full w-full object-cover grayscale contrast-125"
              />
            </div>
          )}
        </div>
      </section>

      {/* Pwoje an vitrin */}
      <section className="border-t tk-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl">{t('home.featured')}</h2>
              <p className="mt-1 text-sm tk-ink-muted">{t('home.featuredSubtitle')}</p>
            </div>
            <Link to="/projects" className="hidden text-sm tk-accent sm:inline">
              {t('home.viewAll')}
            </Link>
          </div>

          {projectsLoading ? (
            <Loader />
          ) : featured.length === 0 ? (
            <p className="tk-ink-muted text-sm">{t('home.noProjects')}</p>
          ) : (
            <div className="border-t tk-border">
              {featured.map((project, index) => (
                <ProjectRow key={project.id} project={project} index={index} />
              ))}
            </div>
          )}

          <Link to="/projects" className="mt-8 inline-block text-sm tk-accent sm:hidden">
            {t('home.viewAll')}
          </Link>
        </div>
      </section>
    </div>
  );
}

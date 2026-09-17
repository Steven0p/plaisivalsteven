import { useLanguage } from '../i18n/LanguageContext';
import useFetch from '../hooks/useFetch';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { getProjects } from '../services/projectService';
import { Loader, ErrorMessage, EmptyMessage } from '../components/ui/StateViews';

function TerminalChrome({ path }) {
  return (
    <div className="flex items-center gap-2 border-b px-4 py-3 tk-border tk-surface-2">
      <span className="h-3 w-3 shrink-0 rounded-full bg-[#ff5f56]" />
      <span className="h-3 w-3 shrink-0 rounded-full bg-[#ffbd2e]" />
      <span className="h-3 w-3 shrink-0 rounded-full bg-[#27c93f]" />
      <span className="ml-3 min-w-0 flex-1 truncate text-xs tk-ink-muted">{path}</span>
    </div>
  );
}

function ProjectCard({ project }) {
  const { t } = useLanguage();
  const techs = (project.technologies || '')
    .split(',')
    .map((tech) => tech.trim())
    .filter(Boolean);

  return (
    <article className="min-w-0 border tk-border tk-surface tk-radius">
      <TerminalChrome path={`~/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`} />
      <div className="p-5">
        <p className="tk-ink-muted">
          <span className="tk-accent">$</span> cat README.md
        </p>
        <h2 className="mt-3 font-display text-xl tk-ink"># {project.title}</h2>
        {project.description && (
          <p className="mt-2 text-sm leading-relaxed tk-ink-muted">{project.description}</p>
        )}

        {techs.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {techs.map((tech) => (
              <span key={tech} className="border px-2 py-0.5 text-xs tk-border tk-accent tk-radius">
                #{tech}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-4 text-sm">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              className="tk-accent underline-offset-4 hover:underline"
            >
              $ git clone {t('common.viewCode')}
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noreferrer"
              className="tk-accent underline-offset-4 hover:underline"
            >
              $ ./run --demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  useDocumentTitle(`${t('projects.title')} — Steven Plaisival`);
  const { data: projects, loading, error } = useFetch(() => getProjects(), []);

  return (
    <div data-theme="terminal">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="font-display text-sm tk-ink-muted">
          <span className="tk-accent">$</span> {t('projects.kicker')}
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">{t('projects.title')}</h1>
        <p className="mt-2 text-sm tk-ink-muted">{t('projects.subtitle')}</p>

        <div className="mt-10">
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage />
          ) : !projects || projects.length === 0 ? (
            <EmptyMessage>{t('projects.empty')}</EmptyMessage>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

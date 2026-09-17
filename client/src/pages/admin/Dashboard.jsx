import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { getProjects } from '../../services/projectService';
import { getMessages } from '../../services/messageService';
import { Loader } from '../../components/ui/StateViews';

function StatCard({ label, value, to }) {
  return (
    <Link
      to={to}
      className="block border tk-border tk-surface p-6 tk-radius transition-colors hover:tk-surface-2"
    >
      <p className="text-xs uppercase tracking-wide tk-ink-muted">{label}</p>
      <p className="mt-2 font-display text-4xl">{value}</p>
    </Link>
  );
}

export default function Dashboard() {
  const { data: projects, loading: projectsLoading } = useFetch(() => getProjects(), []);
  const { data: messages, loading: messagesLoading } = useFetch(() => getMessages(), []);

  const unread = (messages || []).filter((m) => !m.is_read).length;

  if (projectsLoading || messagesLoading) return <Loader />;

  return (
    <div>
      <h1 className="font-display text-3xl">Tablo Bò</h1>
      <p className="mt-1 text-sm tk-ink-muted">Apèsi rapid sou kontni sit ou a.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Pwojè" value={projects?.length ?? 0} to="/admin/projects" />
        <StatCard label="Mesaj pa li" value={unread} to="/admin/messages" />
        <StatCard label="Total Mesaj" value={messages?.length ?? 0} to="/admin/messages" />
      </div>
    </div>
  );
}

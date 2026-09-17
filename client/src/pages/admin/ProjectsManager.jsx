import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useFetch from '../../hooks/useFetch';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../../services/projectService';
import { Loader } from '../../components/ui/StateViews';

const EMPTY = {
  title: '',
  description: '',
  image: '',
  technologies: '',
  github_url: '',
  demo_url: '',
};

const inputClass =
  'mt-1 w-full border px-3 py-2 tk-border bg-transparent tk-radius outline-none focus:tk-accent';

function ProjectForm({ initial, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({ defaultValues: initial });

  useEffect(() => {
    reset(initial);
  }, [initial, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 border tk-border tk-surface p-6 tk-radius"
    >
      <label className="block text-sm">
        Tit
        <input className={inputClass} {...register('title', { required: true })} />
      </label>
      <label className="block text-sm">
        Deskripsyon
        <textarea rows={3} className={inputClass} {...register('description')} />
      </label>
      <label className="block text-sm">
        Teknoloji (separe ak vigil)
        <input className={inputClass} {...register('technologies')} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          Lyen GitHub
          <input className={inputClass} {...register('github_url')} />
        </label>
        <label className="block text-sm">
          Lyen Demo
          <input className={inputClass} {...register('demo_url')} />
        </label>
      </div>
      <label className="block text-sm">
        Imaj (URL)
        <input className={inputClass} {...register('image')} />
      </label>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="tk-accent-bg px-5 py-2 text-sm font-semibold uppercase tracking-wide tk-radius transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isSubmitting ? 'Ap anrejistre...' : 'Anrejistre'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border px-5 py-2 text-sm tk-border tk-radius transition-colors hover:tk-surface-2"
        >
          Anile
        </button>
      </div>
    </form>
  );
}

export default function ProjectsManager() {
  const { data: projects, loading } = useFetch(() => getProjects(), []);
  const [editing, setEditing] = useState(null); // null = pa gen fòm, 'new' = ajoute, objè = modifye
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (projects) setItems(projects);
  }, [projects]);

  const handleCreate = async (values) => {
    const created = await createProject(values);
    setItems((prev) => [created, ...prev]);
    setEditing(null);
  };

  const handleUpdate = async (values) => {
    const updated = await updateProject(editing.id, values);
    setItems((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setEditing(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Efase pwojè sa a?')) return;
    await deleteProject(id);
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-3xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl">Pwojè</h1>
          <p className="mt-1 text-sm tk-ink-muted">Ajoute, modifye oswa efase pwojè yo.</p>
        </div>
        {editing === null && (
          <button
            type="button"
            onClick={() => setEditing('new')}
            className="self-start tk-accent-bg px-4 py-2 text-sm font-semibold uppercase tracking-wide tk-radius"
          >
            + Nouvo
          </button>
        )}
      </div>

      {editing === 'new' && (
        <div className="mt-6">
          <ProjectForm initial={EMPTY} onSubmit={handleCreate} onCancel={() => setEditing(null)} />
        </div>
      )}
      {editing && editing !== 'new' && (
        <div className="mt-6">
          <ProjectForm initial={editing} onSubmit={handleUpdate} onCancel={() => setEditing(null)} />
        </div>
      )}

      <ul className="mt-8 space-y-3">
        {items.map((project) => (
          <li
            key={project.id}
            className="flex flex-col gap-3 border tk-border tk-surface p-4 tk-radius sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="font-medium">{project.title}</p>
              <p className="text-xs tk-ink-muted">{project.technologies}</p>
            </div>
            <div className="flex shrink-0 gap-2 text-sm">
              <button
                type="button"
                onClick={() => setEditing(project)}
                className="border px-3 py-1 tk-border tk-radius hover:tk-surface-2"
              >
                Modifye
              </button>
              <button
                type="button"
                onClick={() => handleDelete(project.id)}
                className="border px-3 py-1 tk-border tk-accent tk-radius hover:tk-surface-2"
              >
                Efase
              </button>
            </div>
          </li>
        ))}
        {items.length === 0 && <p className="tk-ink-muted text-sm">Poko gen pwojè.</p>}
      </ul>
    </div>
  );
}

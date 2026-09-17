import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    document.documentElement.dataset.theme = 'editorial';
  }, []);

  if (isAuthenticated) {
    return <Navigate to={location.state?.from?.pathname || '/admin'} replace />;
  }

  const onSubmit = async ({ username, password }) => {
    setError(null);
    try {
      await login(username, password);
      navigate(location.state?.from?.pathname || '/admin', { replace: true });
    } catch {
      setError('Non itilizatè oswa modpas envalid.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center tk-bg tk-ink px-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-full max-w-sm border tk-border tk-surface p-8 tk-radius"
      >
        <p className="text-xs font-medium tracking-[0.3em] tk-accent">PANÈL ADMIN</p>
        <h1 className="mt-3 font-display text-2xl">Konekte</h1>

        <label className="mt-6 block text-sm">
          Non itilizatè
          <input
            className="mt-1 w-full border px-3 py-2 tk-border bg-transparent tk-radius outline-none focus:tk-accent"
            {...register('username', { required: true })}
          />
          {errors.username && <p className="mt-1 text-xs tk-accent">Chan sa a obligatwa.</p>}
        </label>

        <label className="mt-4 block text-sm">
          Modpas
          <input
            type="password"
            className="mt-1 w-full border px-3 py-2 tk-border bg-transparent tk-radius outline-none focus:tk-accent"
            {...register('password', { required: true })}
          />
          {errors.password && <p className="mt-1 text-xs tk-accent">Chan sa a obligatwa.</p>}
        </label>

        {error && <p className="mt-4 text-sm tk-accent">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full tk-accent-bg px-4 py-2 text-sm font-semibold uppercase tracking-wide tk-radius transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isSubmitting ? 'Konekte...' : 'Konekte'}
        </button>
      </form>
    </div>
  );
}

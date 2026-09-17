import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { updateAccount } from '../../services/authService';

const inputClass =
  'mt-1 w-full border px-3 py-2 tk-border bg-transparent tk-radius outline-none focus:tk-accent';

export default function AccountSettings() {
  const { user, setUserInfo } = useAuth();
  const [status, setStatus] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const newPassword = watch('new_password');

  const onSubmit = async (values) => {
    setStatus(null);
    try {
      const payload = {
        current_password: values.current_password,
        new_username: values.new_username || undefined,
        new_email: values.new_email || undefined,
        new_password: values.new_password || undefined,
      };
      const updated = await updateAccount(payload);
      setUserInfo(updated);
      setStatus({ type: 'success', message: 'Kont ou mete ajou.' });
      reset();
    } catch (err) {
      const message = err.response?.data?.message || 'Erè — verifye modpas aktyèl ou epi eseye ankò.';
      setStatus({ type: 'failure', message });
    }
  };

  return (
    <div className="max-w-md">
      <h1 className="font-display text-3xl">Kont</h1>
      <p className="mt-1 text-sm tk-ink-muted">
        Chanje non itilizatè, imèl oswa modpas kont admin ou a ({user?.username}).
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <label className="block text-sm">
          Modpas aktyèl <span className="tk-accent">*</span>
          <input type="password" className={inputClass} {...register('current_password', { required: true })} />
          {errors.current_password && <p className="mt-1 text-xs tk-accent">Chan sa a obligatwa.</p>}
        </label>

        <hr className="tk-border" />

        <label className="block text-sm">
          Nouvo non itilizatè
          <input className={inputClass} placeholder={user?.username} {...register('new_username')} />
        </label>

        <label className="block text-sm">
          Nouvo imèl
          <input type="email" className={inputClass} placeholder={user?.email} {...register('new_email')} />
        </label>

        <label className="block text-sm">
          Nouvo modpas
          <input
            type="password"
            className={inputClass}
            {...register('new_password', { minLength: 8 })}
          />
          {errors.new_password && (
            <p className="mt-1 text-xs tk-accent">Modpas la dwe gen omwen 8 karaktè.</p>
          )}
        </label>

        <label className="block text-sm">
          Konfime nouvo modpas
          <input
            type="password"
            className={inputClass}
            {...register('confirm_password', {
              validate: (value) => !newPassword || value === newPassword || 'Modpas yo pa menm.',
            })}
          />
          {errors.confirm_password && (
            <p className="mt-1 text-xs tk-accent">{errors.confirm_password.message}</p>
          )}
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="tk-accent-bg px-6 py-2 text-sm font-semibold uppercase tracking-wide tk-radius transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isSubmitting ? 'Ap anrejistre...' : 'Anrejistre chanjman yo'}
        </button>

        {status && (
          <p className={`text-sm ${status.type === 'success' ? '' : 'tk-accent'}`}>{status.message}</p>
        )}
      </form>
    </div>
  );
}

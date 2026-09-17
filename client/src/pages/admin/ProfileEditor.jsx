import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useFetch from '../../hooks/useFetch';
import { getProfile, updateProfile } from '../../services/profileService';
import { uploadPhoto } from '../../services/uploadService';
import { Loader } from '../../components/ui/StateViews';

const FIELDS = [
  { name: 'full_name', label: 'Non Konplè', required: true },
  { name: 'title', label: 'Tit / Wòl' },
  { name: 'email', label: 'Imèl' },
  { name: 'phone', label: 'Telefòn' },
  { name: 'location', label: 'Lokalizasyon' },
  { name: 'cv_url', label: 'Lyen CV (URL)' },
];

const inputClass =
  'mt-1 w-full border px-3 py-2 tk-border bg-transparent tk-radius outline-none focus:tk-accent';

export default function ProfileEditor() {
  const { data: profile, loading } = useFetch(() => getProfile().catch(() => null), []);
  const [status, setStatus] = useState(null);
  const [uploading, setUploading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    if (profile) reset(profile);
  }, [profile, reset]);

  const photo = watch('photo');

  const onSubmit = async (values) => {
    setStatus(null);
    try {
      const updated = await updateProfile(values);
      reset(updated);
      setStatus('success');
    } catch {
      setStatus('failure');
    }
  };

  const handlePhotoChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setStatus(null);
    try {
      const { url } = await uploadPhoto(file);
      setValue('photo', url);
    } catch {
      setStatus('upload-failure');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl">Pwofil</h1>
      <p className="mt-1 text-sm tk-ink-muted">
        Enfòmasyon sa yo parèt sou paj Akèy, Sou Mwen ak Kontak sit la.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <div className="flex items-center gap-4">
          {photo && (
            <img src={photo} alt="" className="h-16 w-16 object-cover tk-radius" />
          )}
          <label className="text-sm">
            <span className="block tk-ink-muted">Foto pwofil</span>
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="mt-1 text-xs" />
            {uploading && <span className="text-xs tk-accent">Ap telechaje...</span>}
          </label>
        </div>

        {FIELDS.map((field) => (
          <label key={field.name} className="block text-sm">
            {field.label}
            <input className={inputClass} {...register(field.name, { required: field.required })} />
          </label>
        ))}

        <label className="block text-sm">
          Byografi
          <textarea rows={5} className={inputClass} {...register('bio')} />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="tk-accent-bg px-6 py-2 text-sm font-semibold uppercase tracking-wide tk-radius transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isSubmitting ? 'Ap anrejistre...' : 'Anrejistre'}
        </button>

        {status === 'success' && <p className="text-sm tk-accent">Pwofil la mete ajou.</p>}
        {status === 'failure' && <p className="text-sm tk-accent">Erè — eseye ankò.</p>}
        {status === 'upload-failure' && <p className="text-sm tk-accent">Upload la echwe.</p>}
      </form>
    </div>
  );
}

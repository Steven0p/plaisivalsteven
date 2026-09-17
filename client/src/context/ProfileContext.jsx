import { createContext, useContext } from 'react';
import useFetch from '../hooks/useFetch';
import { getProfile } from '../services/profileService';

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const { data, loading, error } = useFetch(() => getProfile().catch(() => null), []);

  return (
    <ProfileContext.Provider value={{ profile: data, loading, error }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile dwe itilize anndan yon ProfileProvider');
  return ctx;
}

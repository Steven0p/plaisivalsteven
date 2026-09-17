import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './pages/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProfileEditor from './pages/admin/ProfileEditor';
import ProjectsManager from './pages/admin/ProjectsManager';
import MessagesInbox from './pages/admin/MessagesInbox';
import AccountSettings from './pages/admin/AccountSettings';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      <Route path="admin/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<ProfileEditor />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="messages" element={<MessagesInbox />} />
          <Route path="account" element={<AccountSettings />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { getMessages, markMessageRead, deleteMessage } from '../../services/messageService';
import { Loader, EmptyMessage } from '../../components/ui/StateViews';

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

export default function MessagesInbox() {
  const { data, loading } = useFetch(() => getMessages(), []);
  const [messages, setMessages] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    if (data) setMessages(data);
  }, [data]);

  const handleOpen = async (message) => {
    setOpenId(openId === message.id ? null : message.id);
    if (!message.is_read) {
      await markMessageRead(message.id, true);
      setMessages((prev) => prev.map((m) => (m.id === message.id ? { ...m, is_read: true } : m)));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Efase mesaj sa a?')) return;
    await deleteMessage(id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl">Mesaj</h1>
      <p className="mt-1 text-sm tk-ink-muted">Mesaj ki voye atravè fòm kontak sit la.</p>

      {messages.length === 0 ? (
        <EmptyMessage>Poko gen mesaj.</EmptyMessage>
      ) : (
        <ul className="mt-6 space-y-3">
          {messages.map((message) => (
            <li key={message.id} className="border tk-border tk-surface tk-radius">
              <button
                type="button"
                onClick={() => handleOpen(message)}
                className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
              >
                <div className="flex items-center gap-3">
                  {!message.is_read && <span className="h-2 w-2 shrink-0 tk-accent-bg rounded-full" />}
                  <div>
                    <p className={message.is_read ? 'tk-ink-muted' : 'font-semibold'}>
                      {message.name} — {message.subject || '(san sijè)'}
                    </p>
                    <p className="text-xs tk-ink-muted">
                      {message.email} · {formatDate(message.created_at)}
                    </p>
                  </div>
                </div>
              </button>

              {openId === message.id && (
                <div className="border-t tk-border px-4 py-3">
                  <p className="text-sm leading-relaxed">{message.message}</p>
                  <button
                    type="button"
                    onClick={() => handleDelete(message.id)}
                    className="mt-3 border px-3 py-1 text-xs tk-border tk-accent tk-radius hover:tk-surface-2"
                  >
                    Efase
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

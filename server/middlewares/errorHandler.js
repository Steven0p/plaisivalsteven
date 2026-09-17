function notFound(req, res) {
  res.status(404).json({ message: 'Wout la pa egziste.' });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = status === 500 ? 'Erè entèn sèvè a.' : err.message;

  if (process.env.NODE_ENV !== 'test') {
    console.error(err);
  }

  res.status(status).json({ message });
}

module.exports = { notFound, errorHandler };

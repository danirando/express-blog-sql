const errorHandler = (err, req, res, nex) => {
  res.status(500).json({
    error: err.message,
  });
};

module.exports = errorHandler;

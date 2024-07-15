const admin = (req, res, next) => {
  if (req.user && req.user.name === 'Admin') {
    next();
  } else {
    res.status(403).send({ message: 'Access denied. Admins only.' });
  }
};

export { admin };

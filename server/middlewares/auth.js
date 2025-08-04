// Simulated admin check middleware
const isAdmin = (req, res, next) => {
  // For now, allow all requests as admin. Modify with JWT or role-check later.
  const isAdminUser = true; // Replace this with real check
  if (!isAdminUser) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

export default isAdmin;
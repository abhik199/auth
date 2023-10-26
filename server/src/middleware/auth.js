function isAuthenticated(req, res, done) {
  if (req.user) {
    return done();
  }
  return res.status(401).json({ error: "Unauthorized" });
}
export default isAuthenticated;

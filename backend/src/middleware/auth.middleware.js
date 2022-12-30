module.exports.isLoggedIn = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.status(401).json({
      err: "You need to be logged in to access this page.",
      isLoggedIn: false
    });
  }
}
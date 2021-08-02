module.exports = {
  requireSession: (req, res, next) => {
    const session = req.header("session");
    //we can write the logic to get any data from the session object and verify based on that
    if (!session) {
      return next(res.json({ "authentication_error": "session is required" }));
    }
    return next();
  }
};
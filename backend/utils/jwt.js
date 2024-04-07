export const sendToken = (user, status, res, message) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPRIE * 24 * 60 * 1000),
    httpOnly: true,
  };
  res.status(status).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};

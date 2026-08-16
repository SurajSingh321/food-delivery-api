const authService = require('./auth.service');
const { successResponse } = require('../../utils/response');

const registerWithEmail = async (req, res, next) => {
  try {
    const result = await authService.registerWithEmail(req.body);
    successResponse(res, 201, 'Registered successfully', result);
  } catch (err) {
    next(err);
  }
};

const registerWithPhone = async (req, res, next) => {
  try {
    const result = await authService.registerWithPhone(req.body);
    successResponse(res, 200, result.message);
  } catch (err) {
    next(err);
  }
};

const verifyOtp = async (req, res, next) => {
  try {
    const result = await authService.verifyOtp(req.body);
    successResponse(res, 200, 'Phone verified successfully', result);
  } catch (err) {
    next(err);
  }
};

const loginWithEmail = async (req, res, next) => {
  try {
    const result = await authService.loginWithEmail(req.body);
    successResponse(res, 200, 'Login successful', result);
  } catch (err) {
    next(err);
  }
};

const loginWithPhone = async (req, res, next) => {
  try {
    const result = await authService.loginWithPhone(req.body);
    successResponse(res, 200, result.message);
  } catch (err) {
    next(err);
  }
};

const verifyLoginOtp = async (req, res, next) => {
  try {
    const result = await authService.verifyLoginOtp(req.body);
    successResponse(res, 200, 'Login successful', result);
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ success: false, message: 'Refresh token required' });
    }
    const result = await authService.refreshToken(refreshToken);
    successResponse(res, 200, 'Token refreshed', result);
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const accessToken = req.headers.authorization.split(' ')[1];
    const result = await authService.logout(refreshToken, accessToken);
    successResponse(res, 200, result.message);
  } catch (err) {
    next(err);
  }
};

const logoutAll = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const result = await authService.logoutAll(req.user.id, accessToken);
    successResponse(res, 200, result.message);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerWithEmail,
  registerWithPhone,
  verifyOtp,
  loginWithEmail,
  loginWithPhone,
  verifyLoginOtp,
  refreshToken,
  logout,
  logoutAll,
};
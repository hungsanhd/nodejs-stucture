import { TokenData } from "@modules/auth";
import { Request, Response, NextFunction } from "express";
import LoginDto from "./auth.dto";
import AuthService from "./auth.service";

export default class AuthController {
  private authService = new AuthService();

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const model: LoginDto = req.body;
      const tokenData: TokenData = await this.authService.login(model);
      res.status(200).json({
        message: "Đăng nhập thành công",
        token: tokenData.token,
        refreshToken: tokenData.refreshToken,
        email: model.email,
      });
    } catch (error) {
      next(error);
      // res.status(400).json({ status: 400, message: error.message });
    }
  };

  public refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const refreshToken = req.body.refreshToken;
      const tokenData: TokenData = await this.authService.refreshToken(
        refreshToken
      );
      res.status(200).json(tokenData);
    } catch (error) {
      next(error);
    }
  };

  public revokeToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.body.token;
      await this.authService.revokeToken(token);
      res.status(200);
    } catch (error) {
      next(error);
    }
  };

  public getCurrentLoginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.authService.getCurrentLoginUser(req.user.id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}

import { Route } from "@core/interfaces";
import { authMiddleware } from "@core/middleware";
import { Router } from "express";
import AuthController from "./auth.controller";

export default class AuthRoute implements Route {
  public path = "/api/v1/auth";
  public router = Router();

  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path, this.authController.login);
    this.router.get(
      this.path,
      authMiddleware,
      this.authController.getCurrentLoginUser
    );
    this.router.post(
      this.path + "/refresh-token",
      this.authController.refreshToken
    );
    this.router.post(
      this.path + "/revoke-token",
      authMiddleware,
      this.authController.revokeToken
    );
  }
}

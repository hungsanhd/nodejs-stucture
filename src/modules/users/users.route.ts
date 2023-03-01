import { Route } from "@core/interfaces";
import { authMiddleware, validationMiddleware } from "@core/middleware";
import { Router } from "express";
import RegisterDto from "./dtos/register.dto";
import UsersController from "./users.controller";

export default class UsersRoute implements Route {
  public path = "/api/v1/users";
  public router = Router();

  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(
      this.path,
      validationMiddleware(RegisterDto, true),
      this.usersController.register
    );

    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      this.usersController.updateUser
    );

    this.router.get(this.path, authMiddleware, this.usersController.getAll);

    this.router.get(
      `${this.path}/:id`,
      authMiddleware,
      this.usersController.getUserById
    );

    this.router.get(
      `${this.path}/paging/:page`,
      authMiddleware,
      this.usersController.getAllPaging
    );

    this.router.delete(this.path + '/:id', authMiddleware, this.usersController.deleteUser);

    this.router.delete(this.path, authMiddleware, this.usersController.deleteUsers);

    this.router.post(
      `${this.path}/password_retrieval`,
      authMiddleware,
      this.usersController.passwordRetrieval
    );
  }
}

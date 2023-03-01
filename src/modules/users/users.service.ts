import { HttpException } from "@core/exceptions";
import { isEmptyObject, sendMail } from "@core/utils";
import { TokenData } from "@modules/auth";
import RegisterDto from "./dtos/register.dto";
import UserSchema from "./users.model";
import gravatar from "gravatar";
import bcryptjs from "bcryptjs";
import IUser from "./users.interface";
import { IPagination } from "@core/interfaces";
import { generateJwtToken, randomTokenString } from "@core/utils/helpers";
import { RefreshTokenSchema } from "@modules/refresh_token";

class UserService {
  public userSchema = UserSchema;

  public async createUser(model: RegisterDto): Promise<TokenData> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Thông tin bị trống");
    }

    const user = await this.userSchema.findOne({ email: model.email }).exec();
    if (user) {
      throw new HttpException(409, `Email ${model.email} Đã tồn tại`);
    }

    const avatar = gravatar.url(model.email, {
      size: "200",
      rating: "g",
      default: "mm",
    });

    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(model.password, salt);
    const createdUser = await this.userSchema.create({
      ...model,
      password: hashedPassword,
      avatar: avatar,
      date: Date.now(),
    });
    const refreshToken = await this.generateRefreshToken(createdUser._id);
    await refreshToken.save();

    return generateJwtToken(createdUser._id, refreshToken.token);
  }

  public async updateUser(userId: string, model: RegisterDto): Promise<IUser> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Thông tin bị trống");
    }

    const user = await this.userSchema.findById(userId);
    if (!user) {
      throw new HttpException(400, "Người dùng không tồn tại");
    }
    let avatar = user.avatar;

    let updateUserById;
    if (model.password) {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(model.password, salt);
      updateUserById = await this.userSchema.findByIdAndUpdate(
        userId,
        {
          full_name: model.full_name,
          password: hashedPassword,
        },
        { new: true }
      );
    } else {
      updateUserById = await this.userSchema.findByIdAndUpdate(
        userId,
        {
          full_name: model.full_name,
        },
        { new: true }
      );
    }
    if (!updateUserById)
      throw new HttpException(409, "Cập nhật người dùng không thành công");
    return updateUserById;
  }

  public async getUserById(userId: string): Promise<IUser> {
    const user = await this.userSchema.findById(userId);
    if (!user) {
      throw new HttpException(404, "Người dùng không tồn tại");
    }
    return user;
  }

  public async getAll(): Promise<IUser[]> {
    const users = await this.userSchema.find();
    return users;
  }

  public async getAllPaging(
    keyword: string,
    page: number
  ): Promise<IPagination<IUser>> {
    const pageSize: number = Number(process.env.PAGE_SIZE || 15);

    let query = {};
    if (keyword) {
      query = {
        $or: [
          { email: new RegExp(keyword, "i") },
          { full_name: new RegExp(keyword, "i") },
        ],
      };
    } else {
      query = this.userSchema.find().sort({ date: -1 });
    }

    const users = await this.userSchema
      .find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const rowCount = await this.userSchema.find(query).countDocuments();

    const total_pages = Number(Math.ceil(Number(rowCount) / Number(pageSize)));

    return {
      total: rowCount,
      page: page,
      pageSize: pageSize,
      total_pages: total_pages,
      items: users,
    } as IPagination<IUser>;
  }

  public async deleteUser(userId: string): Promise<IUser> {
    const deletedUser = await this.userSchema.findByIdAndDelete(userId).exec();
    if (!deletedUser) throw new HttpException(409, 'Your id is invalid');
    return deletedUser;
  }

  public async deleteUsers(userIds: string[]): Promise<number | undefined> {
    const result = await this.userSchema.deleteMany({ _id: [...userIds] }).exec();
    if (!result.ok) throw new HttpException(409, 'Your id is invalid');
    return result.deletedCount;
  }

  public async passwordRetrieval(model: RegisterDto): Promise<HttpException> {
    const user = await this.userSchema.findOne({ email: model.email });
    if (!user) {
      throw new HttpException(404, `Email ${model.email} không tồn tại`);
    }
    let updateUserById;
    let pass = process.env.PASSWORDRE!;

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(pass, salt);
    updateUserById = await this.userSchema.findOneAndUpdate(
      { email: model.email },
      {
        password: hashedPassword,
      },
      { new: true }
    );

    if (!updateUserById) {
      throw new HttpException(409, "Đặt lại mật khẩu không thành công");
    } else {
      sendMail(
        model.email,
        `Mật khẩu khôi phục của bạn là: <a href="#">${pass}</a>`
      );
    }
    return new HttpException(200, "Thành công");
  }

  private async generateRefreshToken(userId: string) {
    // create a refresh token that expires in 7 days
    return new RefreshTokenSchema({
      user: userId,
      token: randomTokenString(),
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
  }
}

export default UserService;

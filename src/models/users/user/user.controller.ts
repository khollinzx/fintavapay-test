import { Body, Controller, Post, Res, UsePipes } from "@nestjs/common";
import { HelperValidator } from "../../../helpers/helper.validator";
import { CreateUserDto } from "../dtos/createUser.dto";
import { UserService } from "./user.service";
import { JsonResponseService } from "../../../utils/jsonResponse.service";
import { Response } from 'express';
import { AccountService } from "../../accounts/account/account.service";
import { UtilsService } from "../../../utils/utils.service";

@Controller('user')
export class UserController {
  /**
   *
   * @param service
   * @param jsonResponse
   * @param accountService
   * @param utilsService
   */
  constructor(
    private readonly service: UserService,
    private readonly jsonResponse: JsonResponseService,
    private readonly accountService: AccountService,
    private readonly utilsService: UtilsService,
  ) {}

  @Post('signup')
  @UsePipes(new HelperValidator())
  async createUser(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    let user = await this.service.findByEmail(createUserDto.email);

    if (!user) {
      const payload = {
        email: createUserDto.email,
        name: createUserDto.name,
        password: await this.utilsService.hashPassword(createUserDto.password),
      };

      user = await this.service.createUser(payload);
      // const accountNumber = this.accountService.isAccountNumberUnique();
      //
      // await this.accountService.createAccount({
      //   user_id: user.id,
      //   account_number: accountNumber,
      //   balance: this.utilsService.encrypt(0),
      // });
    } else {
      if (!(await this.utilsService.compareHashedValue( createUserDto.password,  user.password, )))
        return this.jsonResponse.errorResponse(res, 'invalid credentials');
    }

    return this.jsonResponse.successResponse(res, 'logged In', user);
  }
}

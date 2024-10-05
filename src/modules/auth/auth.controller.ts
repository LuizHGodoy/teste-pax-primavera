import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { IsPublic } from "src/common/decorators/is-public.decorator";
import { AuthenticatedRequest } from "src/common/types/AuthenticatedRequest";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  async signIn(@Req() req: AuthenticatedRequest) {
    return this.authService.signIn(req.user);
  }
}

import {Controller, Get, Inject, Param} from '@nestjs/common';
import {EmailService} from "./email.service";

@Controller('email')
export class EmailController {

    constructor(
        @Inject(EmailService) private emailService: EmailService,
    ) {
    }

    @Get('/confirmation/:param')
    emailConfirmation(@Param('param') param: string): Promise<any>{

        return this.emailService.confirmMail(param)
    }


}

import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RegistrationsService } from '../services';
import { CreateRegistrationDto } from '../dto/registration/create-registration.dto';
import { UpdateRegistrationDto } from '../dto/registration/update-registration.dto';

@Controller('registrations')
export class RegistrationsController {
    constructor(private readonly registrationsService:RegistrationsService){}

    @Post()
    create(@Body() createRegistrationDto:CreateRegistrationDto){
        return 'This action adds record created';
    }

    @Get()
    findAll(){
        return 'This action returns Records Found';
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return `This action returns a ${id} record`;
    }

    @Patch()
    async update(@Param('id') id:string, @Body() updateRegistrationDto:UpdateRegistrationDto){
        await this.registrationsService.update(id, updateRegistrationDto)
    }

    @Delete(':id')
    delete(@Param('id')id:string){
        return `This action remove a ${id} record`
    }
}

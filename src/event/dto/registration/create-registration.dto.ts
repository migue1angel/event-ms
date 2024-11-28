import { IsBoolean, IsNotEmpty } from "class-validator";
import { EventEntity } from "../../entities/event.entity";

export class CreateRegistrationDto{
    
    
    @IsBoolean()
    @IsNotEmpty()
    attended:boolean;

    @IsNotEmpty()
    event:EventEntity;

    @IsNotEmpty()
    user:string;

}

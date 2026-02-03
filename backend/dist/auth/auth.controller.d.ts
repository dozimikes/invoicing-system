import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: any;
    }>;
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: Omit<{
            id: number;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            password: string;
            role: import("@prisma/client").$Enums.UserRole;
        }, "password">;
    }>;
}

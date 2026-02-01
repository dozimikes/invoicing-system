import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(email: string, password: string): Promise<{
        access_token: string;
        user: any;
    }>;
    register(email: string, password: string): Promise<{
        access_token: string;
        user: Omit<{
            email: string;
            password: string;
            id: number;
            role: import("@prisma/client-custom").$Enums.UserRole;
            createdAt: Date;
            updatedAt: Date;
        }, "password">;
    }>;
}

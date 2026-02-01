import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<Omit<{
        email: string;
        password: string;
        id: number;
        role: import("@prisma/client-custom").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }, "password">>;
    findAll(): Promise<Omit<{
        email: string;
        password: string;
        id: number;
        role: import("@prisma/client-custom").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }, "password">[]>;
    findOne(id: string): Promise<Omit<{
        email: string;
        password: string;
        id: number;
        role: import("@prisma/client-custom").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }, "password">>;
    remove(id: string): Promise<Omit<{
        email: string;
        password: string;
        id: number;
        role: import("@prisma/client-custom").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }, "password">>;
}

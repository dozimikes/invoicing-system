import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<Omit<{
        id: number;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
    }, "password">>;
    findAll(): Promise<Omit<{
        id: number;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
    }, "password">[]>;
    findOne(id: string): Promise<Omit<{
        id: number;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
    }, "password">>;
    remove(id: string): Promise<Omit<{
        id: number;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
    }, "password">>;
}

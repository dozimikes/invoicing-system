import { UserRole } from '../../prisma/client';
export declare class User {
    id: number;
    email: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

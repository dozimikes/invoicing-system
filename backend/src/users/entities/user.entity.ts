import { UserRole } from '@prisma/client';

export class User {
    id: number;
    email: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

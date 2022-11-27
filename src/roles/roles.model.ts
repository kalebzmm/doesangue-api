/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    Unique,
    BelongsToMany,
} from 'sequelize-typescript';
import { User } from 'src/users/user.entity';
import { RoleUser } from './roles-user.model';

@Table
export class Role extends Model {

    @ApiProperty()
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @ApiProperty()
    @Unique
    @Column
    nome: string;

    @ApiProperty()
    @Column
    descricao?: string;

    @ApiProperty()
    @BelongsToMany(() => User, () => RoleUser)
    users: User[]

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt: Date;
}
  
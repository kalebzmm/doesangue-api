/* eslint-disable prettier/prettier */
import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/user.entity';
import { Role } from './roles.model';

@Table
export class RoleUser extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID
    })
    id_user: string;

    @ForeignKey(() => Role)
    @Column({
        type: DataType.UUID
    })
    id_role: string;

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
  
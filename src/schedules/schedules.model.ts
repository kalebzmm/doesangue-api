import { ApiProperty } from '@nestjs/swagger';
import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/users/user.entity';

@Table
export class Schedule extends Model<Schedule> {

    @ApiProperty()
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @ApiProperty()
    @Column
    date: Date;

    @ApiProperty()
    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID
    })
    id_user: string;

    @BelongsTo(() => User)
    user: User;

    @ApiProperty()
    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @ApiProperty()
    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @ApiProperty()
    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt: Date;
}
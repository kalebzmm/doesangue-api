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
export class Post extends Model<Post> {

    @ApiProperty()
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @ApiProperty()
    @Column
    title: string;

    @ApiProperty()
    @Column
    body: string;

    @ApiProperty()
    @Column
    blood_type: string;

    @ApiProperty()
    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID
    })
    id_user: string;

    @BelongsTo(() => User)
    user: User;

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
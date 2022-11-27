import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleUser } from './roles-user.model';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role,
    @InjectModel(RoleUser)
    private roleUserModel: typeof RoleUser,
  ) {}

  async findAll() {
    return this.roleModel.findAll();
  }

  async findOne(id) {
    return this.roleModel.findByPk(id);
  }

  async create(role) {
    try {
      return await this.roleModel.create(role);
    } catch (err) {
      if (err.name == 'SequelizeUniqueConstraintError') {
        throw new UnprocessableEntityException(
          'O nome do papel já existe no sistema',
        );
      } else {
        throw new InternalServerErrorException(
          'Não foi possível criar o papel',
        );
      }
    }
  }

  async addUserRole(id_user, id_role) {
    try {
      return await this.roleUserModel.create({
        id_user,
        id_role,
      });
    } catch (err) {
      if (err.name == 'SequelizeUniqueConstraintError') {
        throw new UnprocessableEntityException(
          'O usuário já possui o papel informado',
        );
      } else {
        throw new InternalServerErrorException(
          'Não foi possível adicionar o papel ao usuário',
        );
      }
    }
  }

  async removeUserRole(id_user, id_role) {
    return this.roleUserModel.destroy({
      where: {
        id_user,
        id_role,
      },
      force: true,
    });
  }
}

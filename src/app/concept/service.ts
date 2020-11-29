import {NotFoundException} from "@nestjs/common";
import {CrudRequest} from "@nestjsx/crud";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {merge} from "lodash";
import {FindManyOptions, FindOneOptions, IsNull, Not, Repository} from "typeorm";
import {EntityId} from "typeorm/repository/EntityId";

export class BaseService<T> extends TypeOrmCrudService<T> {
    public repository: Repository<T>;

    constructor(repository: Repository<T>) {
      super(repository);
    }

    /**
     * Support for find many soft deleted records
     * @param req
     * @param options
     */
    findManySoftDeleted(
      req: CrudRequest,
      options?: FindManyOptions<T>
    ): Promise<T[]> {
      if (options) {
        options.where = merge(options.where, {
          deletedAt: Not(IsNull())
        });
      }
      return this.repository.find({
        where: options?.where ?? {
          deletedAt: Not(IsNull())
        },
        withDeleted: true,
        skip: req.parsed.offset,
        take: req.parsed.limit,
        relations: options.relations
      });
    }


    /**
     * Find one record soft deleted by id
     * Use in restore usually
     * @param id
     * @param options
     */
    async findByIdSoftDeletedAndThrowErr(
      id: EntityId | number,
      options? :FindOneOptions
    ): Promise<T> {
      const record = await this.repository.findOne(id, {
        where: {
          deletedAt: Not(IsNull())
        },
        withDeleted: true,
        relations: options?.relations ?? ["user", "user.roles"]
      });

      if (!record) {
        throw new NotFoundException()
      }
      return record;
    }
}

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

type ModelKeys = keyof {
  [K in keyof PrismaClient as PrismaClient[K] extends {
    findMany: any;
  }
    ? K
    : never]: any;
};

export class CrudService<
  T extends Record<string, any>,
  CreateInput extends Record<string, any>,
  UpdateInput extends Partial<T>,
> {
  private readonly model: Prisma.ModelName[ModelKeys];

  constructor(modelKey: ModelKeys) {
    this.model = prisma[modelKey] as any;
  }

  async create(data: CreateInput): Promise<T> {
    return this.model.create({ data });
  }

  async findAll(
    options?: Prisma.SelectSubset<T, any>,
  ): Promise<T[]> {
    return this.model.findMany(options);
  }

  async findById(id: number | string): Promise<T | null> {
    return this.model.findUnique({ where: { id } });
  }

  async update(
    id: number | string,
    data: UpdateInput,
  ): Promise<T> {
    return this.model.update({
      where: { id },
      data,
    });
  }

  async delete(id: number | string): Promise<T> {
    return this.model.delete({ where: { id } });
  }

  // Novo: Filtros personalizados
  async findWhere(where: Prisma.WhereInput): Promise<T[]> {
    return this.model.findMany({ where });
  }

  // Novo: Paginação
  async paginate(
    skip: number,
    take: number,
  ): Promise<{ data: T[]; total: number }> {
    const [data, total] = await Promise.all([
      this.model.findMany({ skip, take }),
      this.model.count(),
    ]);
    return { data, total };
  }
}

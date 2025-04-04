import { Prisma, PrismaClient } from '@prisma/client';
import { getPostTables } from '@prisma/client/sql';

class ServiceCrud {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  static async bloqueia_user(entidade: any) {
    if (entidade == 'usuario') {
      return 'Operação não pode ser realizada por motivos de segurança.';
    } else {
      return true;
    }
  }

  static async listar_entidades(): Promise<any[]> {
    const prisma = new PrismaClient();
    return await prisma.$queryRawTyped(getPostTables());
  }
  /**
   * Verifica se uma entidade (tabela) existe no banco de dados.
   * @param {string} entity Nome da entidade a ser verificada.
   * @returns {Promise<boolean>} True se a entidade existir, false caso contrário.
   */
  static async checkIfEntityExists(
    entity: string,
  ): Promise<boolean> {
    const tables = await this.listar_entidades();
    return tables.some(
      (table) => table.TABLE_NAME === entity,
    );
  }

  /**
   * Busca um registro por ID.
   * @param {string} entity Nome da entidade (tabela).
   * @param {string} id ID do registro a ser buscado.
   * @returns {Promise<any>} O registro encontrado.
   */
  static async findById(
    entity: string,
    id: string,
  ): Promise<any> {
    try {
      if (!(await this.checkIfEntityExists(entity))) {
        throw new Error(
          `Entidade ${entity} não existe no banco de dados.`,
        );
      }

      const prisma = new PrismaClient();
      return await (prisma as any)[entity].findUnique({
        where: { id: id },
      });
    } catch (error) {
      console.error(
        `Erro ao buscar registro com ID ${id} na entidade ${entity}: `,
        error,
      );
      throw error; // Rethrow the error after logging it
    }
  }

  /**
   * Busca registros por campo e valor.
   * @param {string} entity Nome da entidade (tabela).
   * @param {string} field Campo pelo qual buscar.
   * @param {any} value Valor a ser buscado.
   * @returns {Promise<any[]>} Lista de registros encontrados.
   */
  static async findByField(
    entity: string,
    field: string,
    value: any,
  ): Promise<any[]> {
    try {
      if (
        !(await this.checkIfEntityExists(entity)) &&
        !(await this.bloqueia_user(entity))
      ) {
        throw new Error(
          `Entidade ${entity} não existe no banco de dados.`,
        );
      }

      const prisma = new PrismaClient();
      const where = { [field]: value };
      return await (prisma as any)[entity].findMany({
        where: where,
      });
    } catch (error) {
      console.error(
        `Erro ao buscar registros por ${field} na entidade ${entity}: `,
        error,
      );
      throw error; // Rethrow the error after logging it
    }
  }

  /**
   * Busca todos os registros de uma entidade.
   * @param {string} entity Nome da entidade (tabela).
   * @returns {Promise<any[]>} Lista de todos os registros.
   */
  static async findAll(entity: string): Promise<any[]> {
    try {
      if (
        !(await this.checkIfEntityExists(entity)) &&
        !(await this.bloqueia_user(entity))
      ) {
        throw new Error(
          `Entidade ${entity} não existe no banco de dados.`,
        );
      }

      const prisma = new PrismaClient();
      return await (prisma as any)[entity].findMany();
    } catch (error) {
      console.error(
        `Erro ao buscar todos os registros da entidade ${entity}: `,
        error,
      );
      throw error; // Rethrow the error after logging it
    }
  }

  /**
   * Cria um novo registro.
   * @param {string} entity Nome da entidade (tabela).
   * @param {object} data Dados para criar o registro.
   * @returns {Promise<any>} O registro criado.
   */
  static async create(
    entity: string,
    data: object,
  ): Promise<any> {
    try {
      if (!(await this.checkIfEntityExists(entity))) {
        throw new Error(
          `Entidade ${entity} não existe no banco de dados.`,
        );
      }

      const prisma = new PrismaClient();
      return await (prisma as any)[entity].create({
        data: data,
      });
    } catch (error) {
      console.error(
        `Erro ao criar registro na entidade ${entity}: `,
        error,
      );
      throw error; // Rethrow the error after logging it
    }
  }

  /**
   * Atualiza um registro.
   * @param {string} entity Nome da entidade (tabela).
   * @param {string} id ID do registro a ser alterado.
   * @param {object} data Dados a serem atualizados.
   * @returns {Promise<any>} O registro atualizado.
   */
  static async update(
    entity: string,
    id: string,
    data: object,
  ): Promise<any> {
    try {
      if (!(await this.checkIfEntityExists(entity))) {
        throw new Error(
          `Entidade ${entity} não existe no banco de dados.`,
        );
      }

      const prisma = new PrismaClient();
      return await (prisma as any)[entity].update({
        where: { id: id },
        data: data,
      });
    } catch (error) {
      console.error(
        `Erro ao atualizar registro com ID ${id} na entidade ${entity}: `,
        error,
      );
      throw error; // Rethrow the error after logging it
    }
  }

  /**
   * Deleta um registro.
   * @param {string} entity Nome da entidade (tabela).
   * @param {string} id ID do registro a ser deletado.
   * @returns {Promise<any>} O registro deletado.
   */
  static async delete(
    entity: string,
    id: string,
  ): Promise<any> {
    try {
      if (
        !(await this.checkIfEntityExists(entity)) &&
        !(await this.bloqueia_user(entity))
      ) {
        throw new Error(
          `Entidade ${entity} não existe no banco de dados.`,
        );
      }

      const prisma = new PrismaClient();
      return await (prisma as any)[entity].delete({
        where: { id: id },
      });
    } catch (error) {
      console.error(
        `Erro ao deletar registro com ID ${id} na entidade ${entity}: `,
        error,
      );
      throw error; // Rethrow the error after logging it
    }
  }
}

export default ServiceCrud;

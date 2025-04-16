/**
 * @author Kairo Chácara
 * @version 1.0
 * @date 07/04/2025
 * @description Serviço genérico responsável por executar operações CRUD (Create, Read, Update, Delete)
 * em qualquer entidade do banco de dados utilizando o Prisma ORM. Também verifica a existência das entidades
 * e protege ações críticas como manipulação direta da tabela 'usuario'.
 */

import { Prisma, PrismaClient } from '@prisma/client';
import { getPostTables } from '@prisma/client/sql';

/**
 * Classe genérica de serviço que executa operações CRUD em qualquer entidade do banco de dados.
 */
class ServiceCrud {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Bloqueia ações diretas em entidades sensíveis como 'usuario'.
   * @param entidade Nome da entidade a ser verificada.
   * @returns Mensagem de bloqueio ou true se permitido.
   */
  static async bloqueia_user(entidade: any) {
    if (entidade == 'usuario') {
      return 'Operação não pode ser realizada por motivos de segurança.';
    } else {
      return true;
    }
  }

  /**
   * Lista todas as entidades (tabelas) presentes no banco de dados.
   * @returns Array com informações das tabelas.
   */
  static async listar_entidades(): Promise<any[]> {
    const prisma = new PrismaClient();
    return await prisma.$queryRawTyped(getPostTables());
  }

  /**
   * Verifica se uma entidade (tabela) existe no banco de dados.
   * @param entity Nome da entidade.
   * @returns Booleano indicando existência.
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
   * Busca um único registro pelo ID.
   * @param entity Nome da entidade.
   * @param id ID do registro.
   * @returns Registro encontrado ou erro.
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
      throw error;
    }
  }

  /**
   * Busca registros com base em um campo e valor específico.
   * @param entity Nome da entidade.
   * @param field Campo para filtrar.
   * @param value Valor a ser buscado.
   * @returns Array de registros encontrados.
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
        where,
      });
    } catch (error) {
      console.error(
        `Erro ao buscar registros por ${field} na entidade ${entity}: `,
        error,
      );
      throw error;
    }
  }

  /**
   * Retorna todos os registros de uma entidade.
   * @param entity Nome da entidade.
   * @returns Array com todos os registros.
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
      throw error;
    }
  }

  /**
   * Cria um novo registro em uma entidade.
   * @param entity Nome da entidade.
   * @param data Dados do novo registro.
   * @returns Registro criado.
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
      return await (prisma as any)[entity].create({ data });
    } catch (error) {
      console.error(
        `Erro ao criar registro na entidade ${entity}: `,
        error,
      );
      throw error;
    }
  }
  /**
   * Cria múltiplos registros em uma entidade do banco de dados.
   *
   * @param entity Nome da entidade/tabela no banco (deve corresponder ao nome do model no Prisma).
   * @param data Array de objetos contendo os dados a serem inseridos.
   * @param skipDuplicates (opcional) Ignora registros duplicados com base nas constraints únicas (default: false).
   * @returns Um objeto com a contagem de registros inseridos.
   *
   * @throws Erro se a entidade não existir ou a inserção falhar.
   */
  static async createMany(
    entity: string,
    data: object[],
    skipDuplicates: boolean = false,
  ): Promise<{ count: number }> {
    try {
      const exists = await this.checkIfEntityExists(entity);
      if (!exists) {
        throw new Error(
          `Entidade "${entity}" não existe no banco de dados.`,
        );
      }

      const prisma = new PrismaClient();
      const result = await (prisma as any)[
        entity
      ].createMany({
        data,
        skipDuplicates,
      });

      console.log(
        `✅ ${result.count} registros criados em "${entity}".`,
      );
      return result;
    } catch (error) {
      console.error(
        `❌ Erro ao criar registros em "${entity}":`,
        error,
      );
      throw new Error(
        `Erro ao criar múltiplos registros em "${entity}".`,
      );
    }
  }

  /**
   * Atualiza um registro existente.
   * @param entity Nome da entidade.
   * @param id ID do registro a ser atualizado.
   * @param data Novos dados do registro.
   * @returns Registro atualizado.
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
        where: { id },
        data,
      });
    } catch (error) {
      console.error(
        `Erro ao atualizar registro com ID ${id} na entidade ${entity}: `,
        error,
      );
      throw error;
    }
  }

  /**
   * Deleta um registro da entidade.
   * @param entity Nome da entidade.
   * @param id ID do registro.
   * @returns Registro deletado.
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
        where: { id },
      });
    } catch (error) {
      console.error(
        `Erro ao deletar registro com ID ${id} na entidade ${entity}: `,
        error,
      );
      throw error;
    }
  }
}

export default ServiceCrud;

import { CustomError } from "../../domain/error/custom-error";
import { ErrorType } from "../../domain/error/error-type";
import { supabaseClient } from "../config/db";

export class MainBaseRepository<T> {
  private db = supabaseClient;
  constructor(private readonly table: string) {}

  protected async create(newData: Partial<T>): Promise<T> {
    const { data, error } = await this.db
      .from(this.table)
      .insert(newData)
      .select()
      .single();

    if (error) {
      switch (error.code) {
        case "23505 ":
          throw new CustomError(
            "Resource already exists",
            ErrorType.RESOURCE_ALREADY_EXISTS
          );
        default:
          throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
      }
    }
    return data as T;
  }

  protected async findBy(column: string, value: string): Promise<T | null> {
    const { data, error } = await this.db
      .from(this.table)
      .select("*")
      .eq(column, value)
      .maybeSingle();

    if (data == null) return null;

    if (error) {
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }

    return data as T;
  }

  protected async updateOne(
    column: string,
    value: string,
    updates: Partial<T>
  ): Promise<T | null> {
    const { data, error } = await this.db
      .from(this.table)
      .update(updates)
      .eq(column, value)
      .select()
      .maybeSingle();

    if (data == null) return null;

    if (error) {
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as T;
  }

  protected async deleteOne(column: string, value: string): Promise<T | null> {
    const { data, error } = await this.db
      .from(this.table)
      .delete()
      .eq(column, value)
      .select()
      .single();

    if (data == null) return null;

    if (error) {
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as T;
  }

  async findManyBy(column: string, value: string): Promise<T[]> {
    const { data, error } = await this.db
      .from(this.table)
      .select("*")
      .eq(column, value);

    if (error) {
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as T[];
  }

  async findManyByIn(column: string, values: string[]): Promise<T[]> {
    const { data, error } = await this.db
      .from(this.table)
      .select("*")
      .in(column, values);

    if (error) {
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as T[];
  }

  // To find the rows having column's data similar to query
  async searchBy(column: string, value: string): Promise<T[]> {
    const { data, error } = await this.db
      .from(this.table)
      .select("*")
      .ilike(column, value);

    if (error) {
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as T[];
  }
}

import { supabaseClient } from "../config/db";
import { DatabaseError } from "../../domain/error/DatabaseError";

export class BaseRepository<T> {
  private db = supabaseClient;

  constructor(private readonly table: string) {}

  protected async create(newData: Partial<T>): Promise<T> {
    const { data, error } = await this.db
      .from(this.table)
      .insert(newData)
      .select()
      .single();

    if (error) throw new DatabaseError(error.message);
    return data as T;
  }

  protected async findBy(column: string, value: string): Promise<T | null> {
    const { data, error } = await this.db
      .from(this.table)
      .select("*")
      .eq(column, value)
      .maybeSingle();

    if (data == null) return null;

    if (error) throw new DatabaseError(error.message);
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

    if (error) throw new DatabaseError(error.message);
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

    if (error) throw new DatabaseError(error.message);
    return data as T;
  }

  async findManyBy(column: string, value: any): Promise<T[]> {
    const { data, error } = await this.db
      .from(this.table)
      .select("*")
      .eq(column, value);

    if (error) throw new DatabaseError(error.message);
    return data as T[];
  }

  async findManyByIn(column: string, values: string[]): Promise<T[]> {
    const { data, error } = await this.db
      .from(this.table)
      .select("*")
      .in(column, values);

    if (error) throw new DatabaseError(error.message);
    return data as T[];
  }

  // To find the rows having column's data similar to query
  async searchBy(column: string, value: string): Promise<T[]> {
    const { data, error } = await this.db
      .from(this.table)
      .select("*")
      .ilike(column, `%${value}%`);

    console.log(data);

    if (error) throw new DatabaseError(error.message);
    return data as T[];
  }
}

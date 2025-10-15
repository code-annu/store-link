import {
  PostgrestResponse,
  PostgrestSingleResponse,
} from "@supabase/supabase-js";
import { supabaseClient } from "../config/db";

export class BaseRepository {
  private db = supabaseClient;
  constructor(protected readonly table: string) {}

  protected async insert(data: any): Promise<PostgrestSingleResponse<any>> {
    return await this.db.from(this.table).insert(data).select().single();
  }

  protected async getByUid(uid: string): Promise<PostgrestSingleResponse<any>> {
    return await this.db.from(this.table).select("*").eq("uid", uid).single();
  }

  protected async getByKey(
    key: string,
    value: any
  ): Promise<PostgrestSingleResponse<any>> {
    return await this.db.from(this.table).select("*").eq(key, value).single();
  }

  protected async update(
    uid: string,
    updates: any
  ): Promise<PostgrestSingleResponse<any>> {
    return this.db
      .from(this.table)
      .update(updates)
      .eq("uid", uid)
      .select()
      .single();
  }

  protected async delete(uid: string): Promise<PostgrestSingleResponse<any>> {
    return await this.db
      .from(this.table)
      .delete()
      .eq("uid", uid)
      .select()
      .single();
  }

  protected async listByIds(uids: Array<string | number>) {
    return await this.db.from(this.table).select("*").in("uid", uids);
  }

  protected async listByColumn(column: string, value: string) {
    return await this.db.from(this.table).select("*").eq(column, value);
  }

  protected async listILIkeByColumn(
    column: string,
    value: string
  ): Promise<PostgrestSingleResponse<any>> {
    return await this.db
      .from(this.table)
      .select("*")
      .ilike(column, `%${value}%`);
  }
}

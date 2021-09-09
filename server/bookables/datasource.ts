import { RESTDataSource } from "apollo-datasource-rest";

type Optional<T> = T | undefined;

export interface IBookableModel {
  group: string;
  title: string;
  days: Int16Array;
  sessions: Int16Array;
  notes: Optional<string>;
}

export interface IBookable extends IBookableModel {
  id: number;
}

export interface IBookableAPI {
  getBookables: () => Promise<IBookable[]>;
  getBookable: (id: number) => Promise<IBookable>;
  createBookable: (model: IBookableModel) => Promise<number>;
  deleteBookable: (id: number) => Promise<number>;
  updateBookable: (bookable: IBookable) => Promise<number>;
}

export class BookableAPI extends RESTDataSource implements IBookableAPI {
  constructor(baseURL: string) {
    super();
    this.baseURL = baseURL;
  };

  getBookables(): Promise<IBookable[]> {
    return this.get<IBookable[]>(`/bookables`);
  };

  getBookable(id: number): Promise<IBookable> {
    return this.get<IBookable>(`/bookables/${id.toString(10)}`);
  };

  async createBookable(model: IBookableModel): Promise<number> {
    const response = await this.post<IBookable>(`/bookables`, model);
    return response.id;
  };

  async deleteBookable(id: number): Promise<number> {
    const _response = await this.delete(`/bookables/${id.toString(10)}`);
    return id;
  };

  async updateBookable(bookable: IBookable): Promise<number> {
    const _response = await this.put(`/bookables/${bookable.id.toString(10)}`, bookable);
    return bookable.id;
  };
}
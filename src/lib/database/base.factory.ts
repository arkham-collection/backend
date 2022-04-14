import { DatabaseService } from "./database.service"

export class BaseFactory<BuildAttributes, CreateAttributes> {
  constructor(protected readonly db: DatabaseService) {}

  public build(params: Partial<BuildAttributes> = {}): BuildAttributes {
    return { ...this.generate(), ...params }
  }

  public buildMany(times: number, params?: Partial<BuildAttributes>): BuildAttributes[] {
    return [...(Array(times) as undefined[])].map(() => this.build(params))
  }

  public async create(params?: Partial<BuildAttributes>): Promise<CreateAttributes> {
    return await this.save(this.build(params))
  }

  public async createMany(times: number, params?: Partial<BuildAttributes>): Promise<CreateAttributes[]> {
    const objects: BuildAttributes[] = this.buildMany(times, params)
    return await Promise.all(objects.map(async (object) => await this.save(object)))
  }

  protected async save(object: BuildAttributes): Promise<CreateAttributes> {
    return await new Promise(() => object)
  }

  protected generate(): BuildAttributes {
    return {} as unknown as BuildAttributes
  }
}

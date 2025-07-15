export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>
  save(user: User): Promise<User>
  findById(id: string): Promise<User | null>
  update(id: string, user: User): Promise<User | null>
  delete(id: string): Promise<boolean>
  findAll(page?: number, limit?: number): Promise<User[]>
  count(): Promise<number>
}

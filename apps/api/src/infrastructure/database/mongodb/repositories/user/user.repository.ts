import { User } from '@/domain/entities/user.entity'
import { IUserRepository } from './interface'
import { injectable } from 'tsyringe'
import { UserModel } from '../../schemas/user.schema'
import { userDocumentToEntity } from '@/applications/mappers/user'

@injectable()
export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const newUser = new UserModel(user)
    await newUser.save()
    return userDocumentToEntity(newUser)
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id)
    return user ? userDocumentToEntity(user) : null
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email })
    return user ? userDocumentToEntity(user) : null
  }

  async update(id: string, user: User): Promise<User | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(id, user, { new: true })
    return updatedUser ? userDocumentToEntity(updatedUser) : null
  }
}

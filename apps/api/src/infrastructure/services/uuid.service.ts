import { randomUUID } from 'crypto'
import { IIdGeneratorService } from '@/shared/types/services/uuid.service'

export class UuidGeneratorService implements IIdGeneratorService {
  generate(): string {
    return randomUUID()
  }
}

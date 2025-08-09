import { RepositoryResult } from '@backend/interfaces/orm-repositories';

/** Интерфейс адаптации данных от репозитория */
export interface AdapterResultRepo<AdaptType = Record<string, unknown>>
  extends Pick<RepositoryResult, 'error'> {
  /** Адаптированные от репозитория данные */
  adapt: AdaptType;
}

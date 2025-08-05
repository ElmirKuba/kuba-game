/** Интерфейс получения экземпляра чего либо из системы */
export interface SystemReadBySlug<ObjectT1 = Record<string, unknown>> {
  /** Ключ предполагаемого экземпляря */
  key: keyof ObjectT1;
  /** Значение ключа предполагаемого экземпляря */
  value: string;
}

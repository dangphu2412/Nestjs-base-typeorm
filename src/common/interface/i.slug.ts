
export interface ISlugColumnOptions {
  name: string;
  value: string;
}

export interface ISlug {
  slugify(data: string): string

  slugifyWithDateTime(data: string): string

  slugifyUpperCaseAndRemoveDash(data: string): string;

  slugifyColumns<T>(sourceObject: T, columns: Array<ISlugColumnOptions>): void;
}

import { Mock } from 'vitest';

export interface SchemaParameter {
  name: string;
  type: string;
  optional: boolean;
  parameters?: number;
}

export interface SchemaMember {
  name: string;
  type: 'event' | 'function' | 'property';
  isPromise?: boolean;
  deprecated?: string | false;
  parameters?: SchemaParameter[];
  value?: unknown;
}

export interface NamespaceSchema {
  functions: SchemaMember[];
  events: SchemaMember[];
  properties: SchemaMember[];
  [key: string]: unknown | NamespaceSchema;
}

export interface ChromeSchema {
  [key: string]: NamespaceSchema;
}

export type MockWithClear<
  TArgs extends unknown[] = unknown[],
  TReturn = unknown,
> = Mock<(...args: TArgs) => TReturn> & {
  clear: () => void;
};

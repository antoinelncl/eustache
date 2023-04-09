export interface Event<T = unknown> {
  name: string;
  once: boolean;
  execute(arg?: T): void;
}

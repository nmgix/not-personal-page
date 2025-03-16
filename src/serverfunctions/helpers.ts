import { articleFolder } from "@/types/consts";
import path, { join } from "path";
import { memoryUsage } from "node:process";

export function splitQuery(url: string) {
  const query: { [queryParam: string]: string } = {};
  url
    .split("?")[1]
    .split("&")
    .forEach(p => {
      const [t, v] = p.split("=");
      query[t] = v;
    });

  return query;
}

// https://stackoverflow.com/a/2450976/14889638
export function shuffle(array: any[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}

class LRUCacheWithTTL<K, V> {
  private cache: Map<K, { value: V; timeoutId: NodeJS.Timeout | null }>;
  private maxSize: number;
  private ttl: number;
  private funcName: string;

  constructor(maxSize: number, ttl: number, name: string) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
    this.funcName = name;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      const oldEntry = this.cache.get(key);
      if (oldEntry?.timeoutId) clearTimeout(oldEntry.timeoutId);
      this.cache.delete(key);
    }

    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      console.log(`${this.funcName}: 🔄 LRU вытеснил ключ "${oldestKey}"`);
      if (oldestKey) this.cache.delete(oldestKey);
    }

    const timeoutId = setTimeout(() => {
      console.log(`${this.funcName}: ⌛ Ключ "${key}" истёк и удалён.`);
      this.cache.delete(key);
    }, this.ttl);

    this.cache.set(key, { value, timeoutId });
  }

  get(key: K): V | undefined {
    if (!this.cache.has(key)) {
      console.log(`${this.funcName}: ❌ Ключ "${key}" не найден.`);
      return undefined;
    }

    const entry = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, entry);

    console.log(`${this.funcName}: 🔁 Ключ "${key}" взят из кэша.`);
    return entry.value;
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }

  delete(key: K): void {
    const entry = this.cache.get(key);
    if (entry?.timeoutId) clearTimeout(entry.timeoutId);
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.forEach((_, key) => this.delete(key));
  }
}

export const memoizeDefaultValues = {
  maxCacheSize: 10,
  ttl: 7 * 24 * 3600 * 1000
};

export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  maxCacheSize: number = memoizeDefaultValues.maxCacheSize,
  ttl: number = memoizeDefaultValues.ttl,
  keyFormatter?: (key: string) => string
): T {
  const functionName = fn.name.replace(/^_/, "");
  const cache = new LRUCacheWithTTL<string, ReturnType<T>>(maxCacheSize, ttl, functionName);

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = args.length > 0 ? (keyFormatter ? keyFormatter(JSON.stringify(args)) : JSON.stringify(args)) : "no-args";

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    console.log(`${functionName}: ✅ Рассчитывание значение для кеша`);
    const result = fn(...args);
    cache.set(key, result);

    return result;
  }) as T;
}

export const docsDirectory = join(process.cwd(), articleFolder);

export function removeFullPath(fileFolder: string) {
  return path.relative(docsDirectory, fileFolder).replace(/\\/g, "/");
}
// export const removeFullPath = memoize(_removeFullPath);

import fs from "fs";
export function setDocMtime(doc: any, fullPath: string) {
  const stats = fs.statSync(fullPath);
  if (!stats.mtime && !stats.mtimeMs && !stats.birthtimeMs) throw new Error("No file stats, impossible");
  doc["date"] = stats.mtime !== undefined ? stats.mtime : new Date(stats.mtimeMs ?? stats.birthtimeMs ?? null);
}

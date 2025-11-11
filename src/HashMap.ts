export class HashMap {
  private capacity: number;
  private loadFactor: number;
  private size: number;
  private buckets: Array<Array<[string, unknown]>>;

  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.size = 0;
    this.buckets = Array.from({ length: capacity }, () => [])
  }

  private hash(key: string): number {
    let hashCode = 0;
    const prime = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode * prime + key.charCodeAt(i)) % this.capacity
    }
    return hashCode
  }
  set(key: string, value: unknown): void {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    bucket.push([key, value]);
    this.size++;
  }
  get(key: string) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const pair of bucket) {
      if (pair[0] === key) {
        return pair[1];
      }
    }
    return null
  }
  has(key: string): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (const pair of bucket) {
      if (pair[0] === key) {
        return true
      }
    }
    return false
  }

  remove(key: string): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      const pair = bucket[i]
      if (pair[0] == key) {
        bucket.splice(i, 1)
        this.size--
        return true
      }
    }
    return false
  }
  length(): number {
    return this.size
  }
  clear(): void {
    this.buckets = Array.from({ length: this.capacity }, () => [])
    this.size = 0
  }
  keys(): string[] {
    const keys: string[] = [];

    for (const bucket of this.buckets) {
      for (const [key] of bucket) {
        keys.push(key);
      }
    }

    return keys;
  }
  values(): unknown[] {
    const values: unknown[] = [];

    for (const bucket of this.buckets) {
      for (const [, value] of bucket) {
        values.push(value);
      }
    }
    return values;
  }
  entries(): Array<[string, unknown]> {
    const pairs: Array<[string, unknown]> = [];
    for (const bucket of this.buckets) {
      for (const [key,value] of bucket) {
        pairs.push([key,value]);
      }
    }
    return pairs
  }

}

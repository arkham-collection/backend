export default function pipe<Data, Value>(
  data: Data,
  value: Value,
): Pipe<Data, Value> {
  return new Pipe(data, value)
}

class Pipe<Data, Value> {
  public readonly value: Value
  private readonly data: Data

  constructor(data: Data, value: Value) {
    this.value = value
    this.data = data
  }

  public yieldSelf(
    clause: (data: Data, value: Value) => Value,
  ): Pipe<Data, Value> {
    const newValue = clause(this.data, this.value)
    return new Pipe(this.data, newValue)
  }
}

import { EventEmitter } from "events"

export class Task {
  private readonly eventEmitter = new EventEmitter()

  constructor(
    private readonly options: {
      name: string
      description: string
      task: () => void | Promise<void>
    },
  ) {}

  public create(): Task {
    const { name, description, task } = this.options
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.eventEmitter.on("run", async () => {
      console.log(`
    *****************************************************************************************
    Running Task: ${name}
    *****************************************************************************************
    Description: ${description}
    `)
      await task()
      this.finish()
    })
    this.eventEmitter.on("finish", () => {
      console.log(`
    Task finished: ${name}
     `)
      process.exit()
    })
    return this
  }

  public run(): void {
    this.eventEmitter.emit("run")
  }

  public finish(): void {
    this.eventEmitter.emit("finish")
  }
}


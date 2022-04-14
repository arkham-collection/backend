import { Command } from "commander"
import { AvailableTasks } from "./types"
import { Task } from "./task"

const program = new Command()
program.requiredOption("--task-name, --task-name <string>", "name of the task")
program.parse(process.argv)
const options = program.opts()
const taskName: string = options.taskName as string
export function defineTasks(tasks: AvailableTasks): void {
  const task: Task | undefined = tasks[taskName]
  if (!task) {
    throw new Error(`${taskName} not found!`)
  }
  task.run()
}

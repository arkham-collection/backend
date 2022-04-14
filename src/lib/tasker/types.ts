import { Task } from "./task"

export type AvailableTasks = {
  [name: string]: Task | undefined
}

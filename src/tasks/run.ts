import FetchData from "./fetch-data.task"
import SeedData from "./seed-data.task"
import { defineTasks } from "src/lib/tasker"

defineTasks({
  FetchData,
  SeedData,
})

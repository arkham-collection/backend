import { Injectable } from "@nestjs/common"

type Parent = { id: string, parentId: string | null }
type WithChildren<T> = T & { children: Array<WithChildren<T>> }
export type Tree<T extends Parent> = Array<WithChildren<T>>

@Injectable()
export class TreeifySerializer<Record extends Parent> {
  public execute(records: Record[]): Array<WithChildren<Record>> {
    return records.reduce((parents, current) => {
      if (current.parentId !== null) return parents

      const currentChildren = this.getChildren(current.id, records)
      return [...parents, { ...current, children: currentChildren }] 
    }, [] as Array<WithChildren<Record>>)
  }

  private getChildren(id: string, clusters: Record[]): Array<WithChildren<Record>> {
    return clusters.reduce((children, current) => {
      if (current.parentId !== id) return children

      const currentChildren = this.getChildren(current.id, clusters)
      return [...children, { ...current, children: currentChildren }]
    }, [] as Array<WithChildren<Record>>)
  }
}

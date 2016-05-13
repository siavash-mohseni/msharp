namespace MSharp {
    export interface IHierarchy {
        getParent?(): IHierarchy;
        getFullPath?(node?: IHierarchy): string;
        getAllChildren?(): Array<IHierarchy>;
        getChildren?(): Array<IHierarchy>;
        withAllParents?(): Array<IHierarchy>;
        getAllParents?(): Array<IHierarchy>;
        withAllChildren?(): Array<IHierarchy>;
        name?: string;
    }

    export class Heirarchy {

        public static extend(type: any) {

            //Get Parent
            type.prototype.getParent = (): IHierarchy => {
                return null;
            }

            //Get Root Node
            type.prototype.isRootNode = (node: IHierarchy): boolean => {
                return node.getParent() == null;
            }

            type.prototype.getFullPath = (hierarchy?: IHierarchy, seperator?: string): string => {
                if (hierarchy == null)
                    return null;
                if (hierarchy.getParent() == null || hierarchy.getParent() == hierarchy)
                    return hierarchy.name;
                else return hierarchy.getParent().getFullPath(seperator) + seperator + hierarchy.name;
            }

            // type.prototype.withAllChildren = (parent: IHierarchy): Array<IHierarchy> => {
            //     return parent.getAllChildren().concat(parent).orderBy(i => i.getFullPath());
            // }

            // type.prototype.getAllChildren = (parent: IHierarchy): Array<IHierarchy> => {
            //     return parent.getChildren().except(parent).selectMany(c => c.withAllChildren()).orderBy(i => i.getFullPath());
            // }

            // type.prototype.withAllParents = (child: IHierarchy): Array<IHierarchy> => {
            //     return child.getAllParents().concat(child).orderBy(i => i.getFullPath());
            // }

            // type.prototype.getAllParents = (child: IHierarchy): Array<IHierarchy> => {
            //     var parent = child.getParent();
            //     if (parent == null || parent == child)
            //         return new Array(0);
            //     else return parent.withAllParents().orderBy(i => i.getFullPath());
            // }
        }
    }
}
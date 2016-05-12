namespace MSharp {
    export interface IHierarchy {
        getParent?(): IHierarchy;
        getChildren?(): Array<IHierarchy>;
        name?: string;
    }

    export class Heirarchy {
        public static extend(type: any) {

            type.prototype.getParent = (): IHierarchy => {
                //Implementation geos here
                console.log('Get Parent');
                return null;
            }

            type.prototype.getChildren = (): Array<IHierarchy> => {
                //Implementation geos here
                console.log('Get Children');
                return null;
            }
        }
    }
}
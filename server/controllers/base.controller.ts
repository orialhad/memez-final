//region imports
import {IMainController} from './main.controller';

//endregion

export interface IBaseController {
    main: IMainController

    init(): Promise<any>
}

export abstract class BaseController implements IBaseController {
    main: IMainController;

    constructor() {
    }

    init(): Promise<any> {
        return Promise.reject('Method not implemented');
    }
}

import { emptyFunction } from '../../utils/function/emptyFunction.js';

export class Router {
    constructor() {
        this.routes = [];
        this.routers = [];
    }

    addRoute({
        path,
        log = false,
        disconnectOnError = false,
    }, ...fns) {
        this.routes.push({
            path,
            log,
            fns,
            disconnectOnError,
        });
    }

    addRouter(path, router) {
        this.routers.push({
            path,
            router,
        });
    }

    subscribe(socket, { path } = {}) {
        this.routes.map((r) => {
            const p = path?.length ? `${path}${r.path}` : r.path;
            socket.on(p, async (data, cb = emptyFunction) => {
                try {
                    let res;
                    for (let i = 0; i < r.fns.length; i++) {
                        res = await r.fns[i](socket, data);
                    }
                    cb(undefined, res);
                } catch (e) {
                    if (r.disconnectOnError) {
                        socket.disconnect();
                    } else {
                        cb(e);
                    }
                }
            });
        });
        this.routers.map((r) => {
            const p = path?.length ? `${path}${r.path}` : r.path;
            r.router.subscribe(socket, { path: p });
        });
    }
}

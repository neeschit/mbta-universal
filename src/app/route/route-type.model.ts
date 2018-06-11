export enum RouteType {
    Light_Rail,
    Heavy_Rail,
    Commuter_Rail,
    Bus,
    Ferry
}

export const ROUTE_DISPLAY_MAP = {
    bus: [RouteType.Bus],
    train: [RouteType.Heavy_Rail, RouteType.Light_Rail],
    commuter: [RouteType.Commuter_Rail]
};

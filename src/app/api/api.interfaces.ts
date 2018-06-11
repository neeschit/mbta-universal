import { RouteType } from '../route/route-type.model';

export interface Route extends BaseResponse {
    attributes: {
        type: RouteType;
        long_name: string;
        short_name: string;
        text_color: string;
        color: string;
        direction_names: string[];
    };
}

export interface Stop extends BaseResponse {
    attributes: {
        address: string;
        description: string;
        latitude: number;
        longitude: number;
        name: string;
    };
}

interface BaseResponse {
    type: string;
    id: string;
    links: {
        self: string;
    };
}

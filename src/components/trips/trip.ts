import dedent from 'dedent';
import type { ReactNode } from 'react';

export type TripPoint = {
    label: string;
    lat: number;
    lng: number;
};

export type TripType = {
    countryCode?: string;
    start: Date;
    end: Date;
    title: string;
    description: string;
    imagesDirectory: string;
    location?: TripPoint;
    route?: TripPoint[];
    flag: ReactNode;
};

type TripOptions = Pick<
    TripType,
    'countryCode' | 'start' | 'end' | 'imagesDirectory' | 'location' | 'route'
>;

export class Trip implements TripType {
    countryCode?: string;
    start: Date;
    end: Date;
    description: string;
    imagesDirectory: string;
    location?: TripPoint;
    route?: TripPoint[];

    constructor(
        public title: string,
        description: string,
        options: TripOptions,
        public flag: ReactNode,
    ) {
        this.description = dedent(description);
        this.countryCode = options.countryCode;
        this.start = options.start;
        this.end = options.end;
        this.imagesDirectory = options.imagesDirectory;
        this.location = options.location;
        this.route = options.route;
    }
}

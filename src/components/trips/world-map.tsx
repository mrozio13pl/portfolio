import * as d3 from 'd3';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { TripPoint, TripType } from './trip';

const countryISOMapping = {
    AFG: 'AF',
    ALA: 'AX',
    ALB: 'AL',
    DZA: 'DZ',
    ASM: 'AS',
    AND: 'AD',
    AGO: 'AO',
    AIA: 'AI',
    ATA: 'AQ',
    ATG: 'AG',
    ARG: 'AR',
    ARM: 'AM',
    ABW: 'AW',
    AUS: 'AU',
    AUT: 'AT',
    AZE: 'AZ',
    BHS: 'BS',
    BHR: 'BH',
    BGD: 'BD',
    BRB: 'BB',
    BLR: 'BY',
    BEL: 'BE',
    BLZ: 'BZ',
    BEN: 'BJ',
    BMU: 'BM',
    BTN: 'BT',
    BOL: 'BO',
    BES: 'BQ',
    BIH: 'BA',
    BWA: 'BW',
    BVT: 'BV',
    BRA: 'BR',
    VGB: 'VG',
    IOT: 'IO',
    BRN: 'BN',
    BGR: 'BG',
    BFA: 'BF',
    BDI: 'BI',
    KHM: 'KH',
    CMR: 'CM',
    CAN: 'CA',
    CPV: 'CV',
    CYM: 'KY',
    CAF: 'CF',
    TCD: 'TD',
    CHL: 'CL',
    CHN: 'CN',
    HKG: 'HK',
    MAC: 'MO',
    CXR: 'CX',
    CCK: 'CC',
    COL: 'CO',
    COM: 'KM',
    COG: 'CG',
    COD: 'CD',
    COK: 'CK',
    CRI: 'CR',
    CIV: 'CI',
    HRV: 'HR',
    CUB: 'CU',
    CUW: 'CW',
    CYP: 'CY',
    CZE: 'CZ',
    DNK: 'DK',
    DJI: 'DJ',
    DMA: 'DM',
    DOM: 'DO',
    ECU: 'EC',
    EGY: 'EG',
    SLV: 'SV',
    GNQ: 'GQ',
    ERI: 'ER',
    EST: 'EE',
    ETH: 'ET',
    FLK: 'FK',
    FRO: 'FO',
    FJI: 'FJ',
    FIN: 'FI',
    FRA: 'FR',
    GUF: 'GF',
    PYF: 'PF',
    ATF: 'TF',
    GAB: 'GA',
    GMB: 'GM',
    GEO: 'GE',
    DEU: 'DE',
    GHA: 'GH',
    GIB: 'GI',
    GRC: 'GR',
    GRL: 'GL',
    GRD: 'GD',
    GLP: 'GP',
    GUM: 'GU',
    GTM: 'GT',
    GGY: 'GG',
    GIN: 'GN',
    GNB: 'GW',
    GUY: 'GY',
    HTI: 'HT',
    HMD: 'HM',
    VAT: 'VA',
    HND: 'HN',
    HUN: 'HU',
    ISL: 'IS',
    IND: 'IN',
    IDN: 'ID',
    IRN: 'IR',
    IRQ: 'IQ',
    IRL: 'IE',
    IMN: 'IM',
    ISR: 'IL',
    ITA: 'IT',
    JAM: 'JM',
    JPN: 'JP',
    JEY: 'JE',
    JOR: 'JO',
    KAZ: 'KZ',
    KEN: 'KE',
    KIR: 'KI',
    PRK: 'KP',
    KOR: 'KR',
    KWT: 'KW',
    KGZ: 'KG',
    LAO: 'LA',
    LVA: 'LV',
    LBN: 'LB',
    LSO: 'LS',
    LBR: 'LR',
    LBY: 'LY',
    LIE: 'LI',
    LTU: 'LT',
    LUX: 'LU',
    MKD: 'MK',
    MDG: 'MG',
    MWI: 'MW',
    MYS: 'MY',
    MDV: 'MV',
    MLI: 'ML',
    MLT: 'MT',
    MHL: 'MH',
    MTQ: 'MQ',
    MRT: 'MR',
    MUS: 'MU',
    MYT: 'YT',
    MEX: 'MX',
    FSM: 'FM',
    MDA: 'MD',
    MCO: 'MC',
    MNG: 'MN',
    MNE: 'ME',
    MSR: 'MS',
    MAR: 'MA',
    MOZ: 'MZ',
    MMR: 'MM',
    NAM: 'NA',
    NRU: 'NR',
    NPL: 'NP',
    NLD: 'NL',
    ANT: 'AN',
    NCL: 'NC',
    NZL: 'NZ',
    NIC: 'NI',
    NER: 'NE',
    NGA: 'NG',
    NIU: 'NU',
    NFK: 'NF',
    MNP: 'MP',
    NOR: 'NO',
    OMN: 'OM',
    PAK: 'PK',
    PLW: 'PW',
    PSE: 'PS',
    PAN: 'PA',
    PNG: 'PG',
    PRY: 'PY',
    PER: 'PE',
    PHL: 'PH',
    PCN: 'PN',
    POL: 'PL',
    PRT: 'PT',
    PRI: 'PR',
    QAT: 'QA',
    REU: 'RE',
    ROU: 'RO',
    RUS: 'RU',
    RWA: 'RW',
    BLM: 'BL',
    SHN: 'SH',
    KNA: 'KN',
    LCA: 'LC',
    MAF: 'MF',
    SPM: 'PM',
    VCT: 'VC',
    WSM: 'WS',
    SMR: 'SM',
    STP: 'ST',
    SAU: 'SA',
    SEN: 'SN',
    SRB: 'RS',
    SYC: 'SC',
    SLE: 'SL',
    SGP: 'SG',
    SXM: 'SX',
    SVK: 'SK',
    SVN: 'SI',
    SLB: 'SB',
    SOM: 'SO',
    ZAF: 'ZA',
    SGS: 'GS',
    SSD: 'SS',
    ESP: 'ES',
    LKA: 'LK',
    SDN: 'SD',
    SUR: 'SR',
    SJM: 'SJ',
    SWZ: 'SZ',
    SWE: 'SE',
    CHE: 'CH',
    SYR: 'SY',
    TWN: 'TW',
    TJK: 'TJ',
    TZA: 'TZ',
    THA: 'TH',
    TLS: 'TL',
    TGO: 'TG',
    TKL: 'TK',
    TON: 'TO',
    TTO: 'TT',
    TUN: 'TN',
    TUR: 'TR',
    TKM: 'TM',
    TCA: 'TC',
    TUV: 'TV',
    UGA: 'UG',
    UKR: 'UA',
    ARE: 'AE',
    GBR: 'GB',
    USA: 'US',
    UMI: 'UM',
    URY: 'UY',
    UZB: 'UZ',
    VUT: 'VU',
    VEN: 'VE',
    VNM: 'VN',
    VIR: 'VI',
    WLF: 'WF',
    ESH: 'EH',
    YEM: 'YE',
    ZMB: 'ZM',
    ZWE: 'ZW',
    XKX: 'XK',
};

const defaultWidth = 600;
const defaultHeight = 500;

function CountryTooltip({ name }: { name: string }) {
    return (
        <span>
            <span className="flex items-center gap-1">
                <strong>{name}</strong>
                {/*<CountryImage country={code} />*/}
            </span>
        </span>
    );
}

function pointPath(projection: d3.GeoProjection, point: TripPoint) {
    return projection([point.lng, point.lat]);
}

function pointRadius(active?: boolean, hover?: boolean, zoom = 1) {
    const baseRadius = hover ? 6 : active ? 5 : 3.5;
    return baseRadius / Math.sqrt(zoom);
}

type TripPointDatum = TripPoint & {
    active?: boolean;
    trip?: TripType;
};

export function WorldMap({
    trips,
    activeTrip,
    onTripSelect,
    visitedCountries,
}: {
    trips: TripType[];
    activeTrip?: TripType;
    onTripSelect?: (trip: TripType) => void;
    visitedCountries: string[];
}) {
    const countries = useMemo(
        () => [
            ...visitedCountries,
            ...trips.flatMap(({ countryCode }) => (countryCode ? [countryCode.toUpperCase()] : [])),
        ],
        [trips],
    );
    const [geoJsonData, setGeoJsonData] = useState<any>();
    const [tooltip, setTooltip] = useState<{ x: number; y: number; content: React.ReactNode }>();
    const [width, setWidth] = useState(defaultWidth);
    const [height, setHeight] = useState(defaultHeight);

    const ref = useRef<SVGSVGElement>(null);
    const transformRef = useRef<d3.ZoomTransform>(d3.zoomIdentity);

    const projection = useMemo(() => {
        if (!geoJsonData) return;
        return d3.geoMercator().fitSize([width, height], geoJsonData);
    }, [geoJsonData, width, height]);

    useEffect(() => {
        d3.json<any>('/world.geojson').then(setGeoJsonData);
    }, []);

    useEffect(() => {
        if (!ref.current || !geoJsonData || !projection) return;

        const svg = d3.select(ref.current);
        svg.selectAll('*').remove();
        svg.attr('width', width).attr('height', height);

        const path = d3.geoPath().projection(projection);
        const mapLayer = svg.append('g').attr('class', 'map-layer countries-layer');

        mapLayer
            .selectAll('path')
            .data(geoJsonData.features)
            .join('path')
            .attr('d', path as any)
            .attr('fill', (d: any) => {
                const code = countryISOMapping[d.id as keyof typeof countryISOMapping];
                const val = countries.includes(code);
                return val ? '#66e6f955' : '#222';
            })
            .on('mouseover', function (event, d: any) {
                d3.select(this).attr('opacity', 0.7);

                setTooltip({
                    x: event.offsetX,
                    y: event.offsetY,
                    content: <CountryTooltip name={d.properties.name} />,
                });
            })
            .on('mousemove', function (event) {
                setTooltip((prev) => prev && { ...prev, x: event.offsetX, y: event.offsetY });
            })
            .on('mouseout', function () {
                d3.select(this).attr('opacity', 1);
                setTooltip(undefined);
            });

        const zoom = d3
            .zoom()
            .scaleExtent([1, 8])
            .translateExtent([
                [0, 0],
                [width, height],
            ])
            .on('zoom', function (event) {
                transformRef.current = event.transform;
                svg.selectAll<SVGGElement, unknown>('g.map-layer').attr(
                    'transform',
                    event.transform.toString(),
                );

                svg.selectAll<SVGCircleElement, TripPointDatum>('circle.trip-point').attr(
                    'r',
                    (d) => pointRadius(d.active, false, event.transform.k),
                );
            });

        svg.call(zoom as any);
    }, [countries, geoJsonData, height, projection, width]);

    useEffect(() => {
        if (!ref.current || !projection) return;

        const svg = d3.select(ref.current);
        svg.selectAll('g.trips-layer').remove();

        const mapLayer = svg
            .append('g')
            .attr('class', 'map-layer trips-layer')
            .attr('transform', transformRef.current.toString());

        const route = activeTrip?.route;
        if (route?.length && route.length > 1) {
            const routePoints = route
                .map((point) => pointPath(projection, point))
                .filter((point): point is [number, number] => Boolean(point));

            const line = d3
                .line<[number, number]>()
                .x(([x]) => x)
                .y(([, y]) => y)
                .curve(d3.curveCatmullRom.alpha(0.5));

            mapLayer
                .append('path')
                .attr('d', line(routePoints))
                .attr('fill', 'none')
                .attr('stroke', '#facc15')
                .attr('stroke-dasharray', '6 6')
                .attr('opacity', 0.95);
        }

        const points: TripPointDatum[] = [
            ...trips.flatMap((trip) =>
                trip.location ? [{ ...trip.location, active: trip === activeTrip, trip }] : [],
            ),
            ...(activeTrip?.route ?? []).map((point) => ({
                ...point,
                active: true,
                trip: activeTrip,
            })),
        ];

        mapLayer
            .selectAll('circle.trip-point')
            .data(points)
            .join('circle')
            .attr('class', 'trip-point')
            .attr('cursor', (d) => (d.trip ? 'pointer' : 'default'))
            .attr('cx', (d) => pointPath(projection, d)?.[0] ?? 0)
            .attr('cy', (d) => pointPath(projection, d)?.[1] ?? 0)
            .attr('r', (d) => pointRadius(d.active, false, transformRef.current.k))
            .attr('fill', (d) => (d.active ? '#facc15' : '#66e6f9'))
            .attr('opacity', (d) => (activeTrip && !d.active ? 0.45 : 1))
            .on('mouseover', function (event, d) {
                d3.select(this).attr('r', pointRadius(d.active, true, transformRef.current.k));
                setTooltip({
                    x: event.offsetX,
                    y: event.offsetY,
                    content: <strong>{d.label}</strong>,
                });
            })
            .on('mousemove', function (event) {
                setTooltip((prev) => prev && { ...prev, x: event.offsetX, y: event.offsetY });
            })
            .on('mouseout', function (_, d) {
                d3.select(this).attr('r', pointRadius(d.active, false, transformRef.current.k));
                setTooltip(undefined);
            })
            .on('click', function (event, d) {
                event.stopPropagation();
                if (d.trip) onTripSelect?.(d.trip);
            });
    }, [activeTrip, onTripSelect, projection, trips]);

    function onResize() {
        const innerWidth = window.innerWidth - 40; // add some margin
        setWidth(Math.min(defaultWidth, innerWidth));
        setHeight(Math.min(defaultHeight, innerWidth * (defaultHeight / defaultWidth)));
    }

    useEffect(() => {
        onResize();

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <div className="relative" style={{ width, height }}>
            <svg ref={ref} />
            {tooltip && (
                <div
                    className="absolute z-50 px-3 py-2 text-sm bg-black/80 rounded pointer-events-none"
                    style={{
                        left: tooltip.x + 10,
                        top: tooltip.y - 28,
                        // transform: 'translate(-50%, 50%)',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {tooltip.content}
                </div>
            )}
        </div>
    );
}

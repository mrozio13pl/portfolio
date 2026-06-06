import { startTransition, useMemo, useState, ViewTransition } from 'react';
import { MA, MT, RO } from 'country-flag-icons/react/3x2';
import { Trip } from '../trips/trip';
import { WorldMap } from '../trips/world-map';
import { Flag } from '../flag';
import { clsx } from 'clsx';
import { MoveLeft } from 'lucide-react';
import { Gallery } from '../gallery';
import { useLocale, useTranslate } from '@/i18n';

function formatDate(date: Date, locale: string) {
    return new Intl.DateTimeFormat(locale === 'pl' ? 'pl-PL' : 'en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
}

function tripTransitionName(title: string) {
    return `trip-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

function formatDuration(start: Date, end: Date, t: ReturnType<ReturnType<typeof useTranslate>>) {
    const totalMinutes = Math.round((end.valueOf() - start.valueOf()) / 1000 / 60);
    const days = Math.floor(totalMinutes / 60 / 24);

    return days === 1 ? t('day') : t('days', days);
}

const visitedCountries = [
    'PL',
    'DE',
    'US',
    'BE',
    'PT',
    'ES',
    'FR',
    'IT',
    'AT',
    'GR',
    'TR',
    'SI',
    'HR',
    'EG',
    'SK',
    'HU',
];

export function Trips() {
    const t = useTranslate()('tripsSection');
    const locale = useLocale()[0];
    const [selectedTrip, setSelectedTrip] = useState<Trip>();
    const trips = useMemo(
        () => [
            new Trip(
                'Malta',
                'Malta & Gozo',
                {
                    countryCode: 'mt',
                    location: { label: 'Malta', lat: 35.9375, lng: 14.3754 },
                    route: [
                        { label: 'Katowice Airport (KTW)', lat: 50.4743, lng: 19.08 },
                        { label: 'Malta', lat: 35.9375, lng: 14.3754 },
                    ],
                    imagesDirectory: 'malta-2026',
                    start: new Date('2026-05-27 19:00'),
                    end: new Date('2026-06-02 22:00'),
                },
                <MT />,
            ),
            new Trip(
                'Morocco',
                'Marrakesh, Merzouga and Fez',
                {
                    countryCode: 'ma',
                    location: { label: 'Marrakesh', lat: 31.6295, lng: -7.9811 },
                    route: [
                        { label: 'Kraków Airport (KRK)', lat: 50.0777, lng: 19.7848 },
                        { label: 'Milan Malpensa (MXP)', lat: 45.63, lng: 8.7231 },
                        { label: 'Marrakesh', lat: 31.6295, lng: -7.9811 },
                        { label: 'Merzouga', lat: 31.0802, lng: -4.0134 },
                        { label: 'Marrakesh', lat: 31.6295, lng: -7.9811 },
                        { label: 'Fez', lat: 34.0181, lng: -5.0078 },
                        { label: 'Marrakesh', lat: 31.6295, lng: -7.9811 },
                        { label: 'Milan Malpensa (MXP)', lat: 45.63, lng: 8.7231 },
                        { label: 'Kraków Airport (KRK)', lat: 50.0777, lng: 19.7848 },
                    ],
                    imagesDirectory: 'morocco-2026',
                    start: new Date('2026-01-31 06:15'),
                    end: new Date('2026-02-08 08:45'),
                },
                <MA />,
            ),
            new Trip(
                'Bucharest',
                'Weekend in Bucharest',
                {
                    countryCode: 'ro',
                    location: { label: 'Bucharest', lat: 44.4268, lng: 26.1025 },
                    route: [
                        { label: 'Kraków Airport (KRK)', lat: 50.0777, lng: 19.7848 },
                        { label: 'Bucharest', lat: 44.4268, lng: 26.1025 },
                        { label: 'Kraków Airport (KRK)', lat: 50.0777, lng: 19.7848 },
                    ],
                    imagesDirectory: 'bucharest-2025',
                    start: new Date('2025-11-15 11:15'),
                    end: new Date('2025-11-16 17:30'),
                },
                <RO />,
            ),
            new Trip(
                'Madeira',
                'Ronaldo',
                {
                    location: { label: 'Madeira', lat: 32.7607, lng: -16.9595 },
                    route: [
                        { label: 'Kraków Airport (KRK)', lat: 50.0647, lng: 19.945 },
                        { label: 'Brussels', lat: 50.8503, lng: 4.3517 },
                        { label: 'Madeira', lat: 32.7607, lng: -16.9595 },
                        { label: 'Rome', lat: 41.9028, lng: 12.4964 },
                        { label: 'Warsaw Chopin Airport (WAW)', lat: 52.2297, lng: 21.0122 },
                        { label: 'Kraków', lat: 50.0647, lng: 19.945 },
                    ],
                    imagesDirectory: 'madeira-2025',
                    start: new Date('2025-01-17 6:00'),
                    end: new Date('2025-01-22 23:00'),
                },
                <img src="./madeira.png" />,
            ),
        ],
        [],
    );

    const sortedTrips = [...trips].sort((a, b) => b.start.valueOf() - a.start.valueOf());
    const visibleTrips = selectedTrip ? [selectedTrip] : sortedTrips;

    function selectTrip(trip: Trip) {
        startTransition(() => setSelectedTrip(trip));
    }

    function showAllTrips() {
        startTransition(() => setSelectedTrip(undefined));
    }

    return (
        <div className="size-full flex flex-col items-center">
            <h2 className="font-primary font-extrabold text-3xl pt-12 text-cyan-3">{t('title')}</h2>

            <p className="text-#F7F7E3 my-4">{t('subtitle')}</p>

            <WorldMap
                trips={trips}
                activeTrip={selectedTrip}
                onTripSelect={selectTrip}
                visitedCountries={visitedCountries}
            />

            {selectedTrip && (
                <button
                    type="button"
                    className="self-start flex items-center gap-x-1 ml-3 md:ml-12 my-4 text-sm text-cyan-2 hover:text-cyan-1"
                    onClick={showAllTrips}
                >
                    <MoveLeft size={16} />
                    {t('showAll')}
                </button>
            )}

            <ul className="w-full md:px-12 mb-8 divide-y divide-white/10">
                {visibleTrips.map((trip) => {
                    const expanded = trip === selectedTrip;

                    return (
                        <ViewTransition key={trip.title} name={tripTransitionName(trip.title)}>
                            <li
                                className={clsx(
                                    'py-4 transition-colors',
                                    !selectedTrip && 'cursor-pointer hover:bg-white/5',
                                )}
                                onClick={() => {
                                    if (!selectedTrip) selectTrip(trip);
                                }}
                            >
                                <div className="flex items-start gap-3 px-3">
                                    <Flag className="mt-1.5 shrink-0">{trip.flag}</Flag>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-4">
                                            <h3 className="font-extrabold text-lime-2 font-primary text-2xl leading-tight">
                                                {trip.title}
                                            </h3>
                                            <span className="text-sm text-cyan-2 whitespace-nowrap">
                                                {formatDuration(trip.start, trip.end, t)}
                                            </span>
                                        </div>

                                        <p className="text-sm text-white/55 mt-1">
                                            {formatDate(trip.start, locale)} -{' '}
                                            {formatDate(trip.end, locale)}
                                        </p>

                                        <div
                                            className={clsx(
                                                'transition-opacity duration-300',
                                                expanded
                                                    ? 'overflow-visible opacity-100'
                                                    : 'max-h-7 overflow-hidden opacity-85',
                                            )}
                                        >
                                            <p
                                                className={clsx(
                                                    'leading-7 mt-2 text-white/85',
                                                    expanded ? 'whitespace-pre-line' : 'truncate',
                                                )}
                                            >
                                                {trip.description}
                                            </p>

                                            {expanded && (
                                                <Gallery
                                                    tripId={trip.title}
                                                    className="mt-4 lt-mobile:(-ml-16 -mr-6)"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ViewTransition>
                    );
                })}
            </ul>
        </div>
    );
}

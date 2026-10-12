import { geoBounds, geoCentroid, geoDistance } from 'd3-geo';
import { feature, mesh } from 'topojson-client';
import { GeometryCollection, Topology } from 'topojson-specification';
import { Feature, LineString, Polygon } from 'geojson';

/** A geometry with a bounding cap, so pieces off the visible part of the globe skip projection. */
export interface GlobePiece<G> {
  geometry: G;
  center: [number, number];
  /** Angular radius (radians) of a cap around `center` containing the whole geometry. */
  radius: number;
}

/** One world-atlas resolution, split into individually cullable land polygons and border lines. */
export interface GlobeLayer {
  land: Array<GlobePiece<Polygon>>;
  borders: Array<GlobePiece<LineString>>;
  countries: Feature[];
}

export type CountriesTopology = Topology<{ countries: GeometryCollection }>;

function piece<G extends Polygon | LineString>(geometry: G): GlobePiece<G> {
  const center = geoCentroid(geometry);
  const [[x0, y0], [x1, y1]] = geoBounds(geometry);
  const corners: Array<[number, number]> = [
    [x0, y0],
    [x0, y1],
    [x1, y0],
    [x1, y1],
  ];
  return { geometry, center, radius: Math.max(...corners.map((c) => geoDistance(center, c))) };
}

export function toGlobeLayer(topology: CountriesTopology): GlobeLayer {
  const countries = feature(topology, topology.objects.countries).features as Feature[];
  const land = countries.flatMap(({ geometry: g }) =>
    g.type === 'Polygon'
      ? [piece(g)]
      : g.type === 'MultiPolygon'
        ? g.coordinates.map((coordinates) => piece({ type: 'Polygon', coordinates }))
        : [],
  );
  const borders = mesh(topology, topology.objects.countries, (a, b) => a !== b).coordinates.map(
    (coordinates) => piece({ type: 'LineString', coordinates }),
  );
  return { land, borders, countries };
}

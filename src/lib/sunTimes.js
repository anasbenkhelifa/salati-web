// Minimal astronomical sunrise/sunset calculation (NOAA-style, ported from
// the BSD-licensed suncalc algorithm). Accurate to a few minutes — no network,
// no permissions, works offline.

const rad = Math.PI / 180;
const dayMs = 1000 * 60 * 60 * 24;
const J1970 = 2440588;
const J2000 = 2451545;
const e = rad * 23.4397; // obliquity of the Earth

const toJulian = (date) => date.valueOf() / dayMs - 0.5 + J1970;
const fromJulian = (j) => new Date((j + 0.5 - J1970) * dayMs);
const toDays = (date) => toJulian(date) - J2000;

const solarMeanAnomaly = (d) => rad * (357.5291 + 0.98560028 * d);

const eclipticLongitude = (M) => {
  const C = rad * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M));
  const P = rad * 102.9372; // perihelion of the Earth
  return M + C + P + Math.PI;
};

const declination = (L) => Math.asin(Math.sin(L) * Math.sin(e));

const julianCycle = (d, lw) => Math.round(d - 0.0009 - lw / (2 * Math.PI));
const approxTransit = (Ht, lw, n) => 0.0009 + (Ht + lw) / (2 * Math.PI) + n;
const solarTransitJ = (ds, M, L) => J2000 + ds + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L);

const hourAngle = (h, phi, dec) =>
  Math.acos((Math.sin(h) - Math.sin(phi) * Math.sin(dec)) / (Math.cos(phi) * Math.cos(dec)));

/**
 * Sunrise/sunset for a date at lat/lng. Returns null in polar day/night.
 */
export function getSunTimes(date, lat, lng) {
  const lw = rad * -lng;
  const phi = rad * lat;
  const d = toDays(date);

  const n = julianCycle(d, lw);
  const ds = approxTransit(0, lw, n);
  const M = solarMeanAnomaly(ds);
  const L = eclipticLongitude(M);
  const dec = declination(L);
  const Jnoon = solarTransitJ(ds, M, L);

  const h0 = rad * -0.833; // sun altitude at sunrise/sunset (refraction + disc)
  const w = hourAngle(h0, phi, dec);
  if (Number.isNaN(w)) return null;

  const Jset = solarTransitJ(approxTransit(w, lw, n), M, L);
  const Jrise = Jnoon - (Jset - Jnoon);
  return { sunrise: fromJulian(Jrise), sunset: fromJulian(Jset) };
}

/**
 * Coarse position estimate from the browser's timezone — longitude from the
 * standard (non-DST) UTC offset, latitude from the timezone region. Good to
 * within ~an hour of solar time, which is all the ambience needs.
 */
export function estimateCoords() {
  const year = new Date().getFullYear();
  const jan = new Date(year, 0, 1).getTimezoneOffset();
  const jul = new Date(year, 6, 1).getTimezoneOffset();
  const stdOffsetMin = Math.max(jan, jul); // standard time, minutes behind UTC
  const lng = -stdOffsetMin / 4; // 15° per hour

  let region = "";
  try {
    region = (Intl.DateTimeFormat().resolvedOptions().timeZone || "").split("/")[0];
  } catch {
    /* default below */
  }
  const latByRegion = {
    Europe: 48,
    America: 37,
    Africa: 26,
    Asia: 30,
    Australia: -27,
    Pacific: -15,
    Indian: -20,
    Atlantic: 40,
  };
  const lat = latByRegion[region] ?? 30;
  return { lat, lng };
}

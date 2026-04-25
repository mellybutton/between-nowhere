import type { ComponentType } from "react";
import { APRSBeacon } from "./concepts/APRSBeacon";
import { AntennaPattern } from "./concepts/AntennaPattern";
import { BatteryPower } from "./concepts/BatteryPower";
import { FrequencySpacing } from "./concepts/FrequencySpacing";
import { Grounding } from "./concepts/Grounding";
import { Interference } from "./concepts/Interference";
import { LineOfSight } from "./concepts/LineOfSight";
import { RepeaterRelay } from "./concepts/RepeaterRelay";
import { SWRReflection } from "./concepts/SWRReflection";
import { WeatherDistortion } from "./concepts/WeatherDistortion";

/**
 * Animated concept illustrations. Rendered as a floating element in the
 * top third of Learn / Insight / Feedback screens — never full-bleed, never
 * with text. Subtle opacity + glow keep them atmospheric over the existing
 * dark background.
 */

// Canonical mapping (per spec)
const CANONICAL: Record<string, ComponentType> = {
  line_of_sight: LineOfSight,
  interference: Interference,
  frequency: FrequencySpacing,
  antenna: AntennaPattern,
  repeater: RepeaterRelay,
  swr: SWRReflection,
  grounding: Grounding,
  battery_power: BatteryPower,
  weather_effects: WeatherDistortion,
  aprs: APRSBeacon,
};

// Aliases — match real concept ids / categories / tags from the dataset to
// the canonical illustrations above. Anything not listed falls back to
// FrequencySpacing.
const ALIASES: Record<string, keyof typeof CANONICAL> = {
  // Line of sight family
  line_of_sight: "line_of_sight",
  vhf_uhf: "line_of_sight",
  propagation: "line_of_sight",
  ground_wave: "line_of_sight",
  skip_propagation: "line_of_sight",

  // Interference family
  interference: "interference",
  noise_floor: "interference",
  rf_exposure: "interference",

  // Frequency / bandwidth family
  frequency: "frequency",
  bandwidth: "frequency",
  band_plans: "frequency",
  fm_am: "frequency",
  digital_modes: "frequency",
  ctcss_tones: "frequency",

  // Antennas
  antenna: "antenna",
  antennas: "antenna",
  polarization: "antenna",

  // Repeater family
  repeater: "repeater",
  repeaters: "repeater",
  simplex_vs_repeater: "repeater",
  duplex_operation: "repeater",
  offset: "repeater",

  // SWR / feedline
  swr: "swr",
  coax: "swr",
  feedline_loss: "swr",

  // Grounding / electrical safety
  grounding: "grounding",
  breaker_and_fuse: "grounding",

  // Battery / power
  battery_power: "battery_power",
  power: "battery_power",
  emergency_power: "battery_power",
  battery_types: "battery_power",

  // Weather
  weather_effects: "weather_effects",

  // Digital beacons
  aprs: "aprs",

  // Operating procedure → no obvious match, fall back via FrequencySpacing
};

function resolveIllustration(conceptId: string): ComponentType {
  const aliasKey = ALIASES[conceptId];
  if (aliasKey && CANONICAL[aliasKey]) return CANONICAL[aliasKey];
  if (CANONICAL[conceptId]) return CANONICAL[conceptId];
  return FrequencySpacing; // sensible default
}

/**
 * Floating concept illustration. Sits in the top third of the screen with
 * subtle opacity + glow. Pure visual — no text inside.
 */
export function ConceptIllustration({ conceptId }: { conceptId: string }) {
  const Illo = resolveIllustration(conceptId);
  return (
    <div
      aria-hidden
      className="pointer-events-none mx-auto mb-4 h-32 w-full max-w-[260px] opacity-70 sm:h-36"
      style={{
        filter: "drop-shadow(0 0 24px rgba(123, 137, 255, 0.25))",
      }}
    >
      <Illo />
    </div>
  );
}

// All concepts now resolve to *something* (default = FrequencySpacing), so
// `hasIllustration` is always true. Kept for backwards compatibility with
// callers that already gate on it.
export function hasIllustration(_conceptId: string): boolean {
  return true;
}

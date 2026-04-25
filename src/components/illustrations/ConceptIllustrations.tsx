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
// Batch 2
import { BandwidthWidth } from "./concepts/BandwidthWidth";
import { CTCSSAccessTone } from "./concepts/CTCSSAccessTone";
import { CallsignIdentity } from "./concepts/CallsignIdentity";
import { DigitalModes } from "./concepts/DigitalModes";
import { DuplexOffset } from "./concepts/DuplexOffset";
import { LicensingRules } from "./concepts/LicensingRules";
import { ModulationShape } from "./concepts/ModulationShape";
import { NoiseFloor } from "./concepts/NoiseFloor";
import { PublicServiceNetwork } from "./concepts/PublicServiceNetwork";
import { SafetyBoundary } from "./concepts/SafetyBoundary";

/**
 * Animated concept illustrations. Rendered as a floating element in the
 * top third of Learn / Insight / Feedback screens — never full-bleed, never
 * with text. Subtle opacity + glow keep them atmospheric over the existing
 * dark background.
 */

// Canonical mapping: one entry per illustration component.
const CANONICAL: Record<string, ComponentType> = {
  // Batch 1
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
  // Batch 2
  bandwidth: BandwidthWidth,
  modulation: ModulationShape,
  noise_floor: NoiseFloor,
  duplex: DuplexOffset,
  ctcss_tones: CTCSSAccessTone,
  digital_modes: DigitalModes,
  callsigns: CallsignIdentity,
  licensing_rules: LicensingRules,
  public_service: PublicServiceNetwork,
  safe_operation: SafetyBoundary,
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

  // Frequency / band family
  frequency: "frequency",
  band_plans: "frequency",
  fm_am: "frequency",

  // Bandwidth + modulation (now have dedicated illustrations)
  bandwidth: "bandwidth",
  modulation: "modulation",

  // Noise
  noise_floor: "noise_floor",

  // Antennas
  antenna: "antenna",
  antennas: "antenna",
  polarization: "antenna",

  // Repeater family
  repeater: "repeater",
  repeaters: "repeater",
  simplex_vs_repeater: "repeater",

  // Duplex / offset (now have dedicated illustration)
  duplex: "duplex",
  duplex_operation: "duplex",
  offset: "duplex",

  // CTCSS / access tones
  ctcss_tones: "ctcss_tones",

  // Digital modes
  digital_modes: "digital_modes",

  // Callsigns / identity
  callsigns: "callsigns",

  // Licensing
  licensing_rules: "licensing_rules",

  // Public service / nets
  public_service: "public_service",

  // Safety / RF exposure
  safe_operation: "safe_operation",
  rf_exposure: "safe_operation",

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

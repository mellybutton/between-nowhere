import type { ComponentType } from "react";
// Batch 1
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
// Batch 3
import { BreakerFuseProtection } from "./concepts/BreakerFuseProtection";
import { DiffractionAroundObstacle } from "./concepts/DiffractionAroundObstacle";
import { FeedlineLoss } from "./concepts/FeedlineLoss";
import { MicrophoneGain } from "./concepts/MicrophoneGain";
import { PolarizationMatch } from "./concepts/PolarizationMatch";
import { PropagationReflection } from "./concepts/PropagationReflection";
import { RefractionBend } from "./concepts/RefractionBend";
import { SquelchThreshold } from "./concepts/SquelchThreshold";
import { VHFvsUHFBehavior } from "./concepts/VHFvsUHFBehavior";
import { VoltageCurrentFlow } from "./concepts/VoltageCurrentFlow";

/**
 * Animated concept illustrations. Rendered as a floating element in the
 * top third of Learn / Insight / Feedback / Review screens — never full-bleed,
 * never with text. Subtle opacity + glow keep them atmospheric over the
 * existing dark background.
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
  // Batch 3
  propagation: PropagationReflection,
  refraction: RefractionBend,
  diffraction: DiffractionAroundObstacle,
  vhf_uhf: VHFvsUHFBehavior,
  feedline_loss: FeedlineLoss,
  polarization: PolarizationMatch,
  squelch: SquelchThreshold,
  microphone_gain: MicrophoneGain,
  voltage_current: VoltageCurrentFlow,
  breakers_fuses: BreakerFuseProtection,
};

// Aliases — match real concept ids / categories / tags from the dataset to
// the canonical illustrations above. Anything not listed falls back to
// FrequencySpacing. Audited to use the richest available illustration for
// each topic (e.g. polarization → PolarizationMatch, not AntennaPattern).
const ALIASES: Record<string, keyof typeof CANONICAL> = {
  // Line of sight
  line_of_sight: "line_of_sight",
  ground_wave: "line_of_sight",

  // Propagation family (now have dedicated illustrations)
  propagation: "propagation",
  reflection: "propagation",
  skip_propagation: "propagation",
  refraction: "refraction",
  diffraction: "diffraction",

  // VHF / UHF behavior
  vhf_uhf: "vhf_uhf",
  propagation_bands: "vhf_uhf",
  vhf: "vhf_uhf",
  uhf: "vhf_uhf",

  // Interference
  interference: "interference",

  // Frequency / band
  frequency: "frequency",
  band_plans: "frequency",
  fm_am: "frequency",

  // Bandwidth + modulation
  bandwidth: "bandwidth",
  modulation: "modulation",

  // Noise / squelch
  noise_floor: "noise_floor",
  squelch: "squelch",
  noise_gate: "squelch",

  // Audio / mic
  microphone_gain: "microphone_gain",
  audio_level: "microphone_gain",

  // Antennas
  antenna: "antenna",
  antennas: "antenna",
  polarization: "polarization",

  // Repeater
  repeater: "repeater",
  repeaters: "repeater",
  simplex_vs_repeater: "repeater",

  // Duplex / offset
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

  // SWR / feedline (now feedline_loss has its own)
  swr: "swr",
  coax: "feedline_loss",
  feedline_loss: "feedline_loss",
  coax_loss: "feedline_loss",

  // Electrical
  voltage_current: "voltage_current",
  electrical_flow: "voltage_current",
  breakers_fuses: "breakers_fuses",
  fuse: "breakers_fuses",
  breaker: "breakers_fuses",
  breaker_and_fuse: "breakers_fuses",

  // Grounding
  grounding: "grounding",

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
 * subtle opacity + glow. Pure visual — no text inside, non-interactive,
 * mobile-first responsive sizing.
 */
export function ConceptIllustration({ conceptId }: { conceptId: string }) {
  const Illo = resolveIllustration(conceptId);
  return (
    <div
      aria-hidden
      className="pointer-events-none mx-auto mb-5 mt-4 flex h-32 w-full max-w-[260px] items-center justify-center opacity-95 sm:h-44 sm:max-w-[300px]"
      style={{
        maxHeight: 180,
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

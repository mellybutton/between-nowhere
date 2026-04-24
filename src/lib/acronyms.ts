// Common radio acronyms and their expansions
export const acronymExpansions: Record<string, string> = {
  'SWR': 'Standing Wave Ratio',
  'VHF': 'Very High Frequency',
  'UHF': 'Ultra High Frequency',
  'HF': 'High Frequency',
  'FM': 'Frequency Modulation',
  'AM': 'Amplitude Modulation',
  'SSB': 'Single Sideband',
  'CW': 'Continuous Wave',
  'APRS': 'Automatic Packet Reporting System',
  'RF': 'Radio Frequency',
  'FCC': 'Federal Communications Commission',
  'EME': 'Earth-Moon-Earth',
  'DX': 'Distance',
  'QSO': 'Contact',
  'QTH': 'Location',
  'PSK': 'Phase Shift Keying',
  'RTTY': 'Radio Teletype',
  'DMR': 'Digital Mobile Radio',
  'D-STAR': 'Digital Smart Technologies for Amateur Radio',
  'CTCSS': 'Continuous Tone-Coded Squelch System',
  'PL': 'Private Line',
  'DTMF': 'Dual-Tone Multi-Frequency',
};

/**
 * Detects acronyms in a text string and returns the first one found with its expansion
 */
export function detectAcronym(text: string): { acronym: string; expansion: string } | null {
  // Check for each acronym as a whole word
  for (const [acronym, expansion] of Object.entries(acronymExpansions)) {
    // Use word boundary regex to match whole words only
    const regex = new RegExp(`\\b${acronym}\\b`, 'i');
    if (regex.test(text)) {
      return { acronym, expansion };
    }
  }
  return null;
}

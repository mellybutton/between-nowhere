// Comprehensive Learn flow organized from intuitive → technical
// Pulls concepts from all batches in logical learning sequence

export interface LearnConcept {
  id: string;
  stage: 'intuition' | 'infrastructure' | 'coordination' | 'equipment' | 'advanced';
  hook: string;
  insight: string;
  question: string;
  answers: string[];
  correctIndex: number;
  hint?: string;
  acronym?: string;
  headlineCorrect: string;
  headlineIncorrect: string;
  correctAnswerText: string;
  eli5: string;
  whyItMatters: string;
  misconception: string;
  wrongAnswerClarification?: string;
  continueText: string; // Poetic transition to next concept
}

// Stage 1: Intuition (4 concepts)
// Stage 2: Infrastructure (4 concepts)
// Stage 3: Coordination (7 concepts)
// Stage 4: Equipment (7 concepts)
// Stage 5: Advanced (14 concepts)
// Total: 36 concepts

export const learnFlowConcepts: LearnConcept[] = [
  // ===== STAGE 1: INTUITION =====
  {
    id: 'line_of_sight',
    stage: 'intuition',
    hook: "You've been using this your whole life.",
    insight: "Before WiFi. Before cell service. People were already sending signals through the air.",
    question: "What does \"line of sight\" mean in radio communication?",
    answers: [
      "The signal travels in a straight path and can be blocked",
      "The signal bends easily around obstacles",
      "The signal travels underground",
      "The signal only works at night"
    ],
    correctIndex: 0,
    hint: "Think about how light behaves when something blocks it.",
    headlineCorrect: "Yeah — that tracks.",
    headlineIncorrect: "Easy mix-up.",
    correctAnswerText: "The signal travels in a straight path and can be blocked",
    eli5: "Imagine a flashlight in the dark. If something blocks it, the light can't reach the other side. Some radio signals behave the same way.",
    whyItMatters: "This is why your signal drops behind buildings, hills, or trees.",
    misconception: "It's easy to assume signals go everywhere. A lot of them don't. They behave more like light than WiFi.",
    wrongAnswerClarification: "Signals that bend around obstacles or travel underground are different types. Line of sight means the path must be clear.",
    continueText: "The air is full of invisible paths."
  },
  {
    id: 'interference',
    stage: 'intuition',
    hook: "Ever tried to listen to two people at once?",
    insight: "That's basically this.",
    question: "What happens when signals interfere?",
    answers: [
      "They overlap and become harder to understand",
      "They disappear",
      "They double in strength",
      "Nothing happens"
    ],
    correctIndex: 0,
    hint: "What happens when two people talk at the same time?",
    headlineCorrect: "Yeah.",
    headlineIncorrect: "Close.",
    correctAnswerText: "They overlap and become harder to understand",
    eli5: "Signals can overlap and make each other harder to hear.",
    whyItMatters: "Managing interference is part of making communication work.",
    misconception: "Signals don't exist alone. They interact.",
    wrongAnswerClarification: "Signals don't vanish or combine constructively when they interfere. They usually just create noise.",
    continueText: "Sharing space requires coordination."
  },
  {
    id: 'frequency',
    stage: 'intuition',
    hook: "You've heard this word.",
    insight: "But it probably never meant anything real.",
    question: "What is frequency?",
    answers: [
      "How often a signal repeats per second",
      "How strong a signal is",
      "How far a signal travels",
      "How loud it sounds"
    ],
    correctIndex: 0,
    hint: "Focus on how often something happens, not how strong it is.",
    headlineCorrect: "This one matters.",
    headlineIncorrect: "Easy mix-up.",
    correctAnswerText: "How often a signal repeats per second",
    eli5: "Frequency is how fast something vibrates. Faster means higher frequency.",
    whyItMatters: "Different frequencies behave differently. Some go farther. Some carry more detail.",
    misconception: "Frequency is not strength. It's speed.",
    wrongAnswerClarification: "Strength, distance, and volume are separate from how fast the signal oscillates.",
    continueText: "Different speeds open different doors."
  },
  {
    id: 'power',
    stage: 'intuition',
    hook: "This feels obvious.",
    insight: "But only partly.",
    question: "What does increasing transmitter power do?",
    answers: [
      "Makes the signal stronger",
      "Changes the frequency",
      "Changes the antenna",
      "Makes signals bend around obstacles"
    ],
    correctIndex: 0,
    hint: "Does being louder always help if something is in the way?",
    headlineCorrect: "You're not wrong.",
    headlineIncorrect: "Close.",
    correctAnswerText: "Makes the signal stronger",
    eli5: "It's like speaking louder. People farther away can hear you more clearly.",
    whyItMatters: "More power helps, but it won't fix something in the way.",
    misconception: "Power doesn't solve everything. Environment still matters.",
    wrongAnswerClarification: "Power affects strength, not frequency or physical components. It also doesn't change how signals propagate.",
    continueText: "Strength is only part of the story."
  },

  // ===== STAGE 2: INFRASTRUCTURE =====
  {
    id: 'repeaters',
    stage: 'infrastructure',
    hook: "This is where things start to stretch farther.",
    insight: "Sometimes your signal can't make the whole trip. So something helps it.",
    question: "What is a repeater?",
    answers: [
      "A device that receives and retransmits a signal",
      "A type of antenna",
      "A battery backup",
      "A radio brand"
    ],
    correctIndex: 0,
    hint: "What if your signal had a helper in the middle?",
    headlineCorrect: "Exactly.",
    headlineIncorrect: "Close.",
    correctAnswerText: "A device that receives and retransmits a signal",
    eli5: "Think of a relay race. One runner passes the message to another farther ahead. That's a repeater.",
    whyItMatters: "This is how small radios can communicate across entire cities.",
    misconception: "It feels like radios talk directly. A lot of the time, they're passing through other systems.",
    wrongAnswerClarification: "A repeater is infrastructure, not a component like an antenna or power source.",
    continueText: "Sometimes the middle piece makes everything possible."
  },
  {
    id: 'simplex_vs_repeater',
    stage: 'infrastructure',
    hook: "Sometimes you talk straight across. Sometimes you bounce upward first.",
    insight: "Radio communication can happen directly between people or through a repeater.",
    question: "What does simplex mean in radio communication?",
    answers: [
      "Direct radio-to-radio communication without a repeater",
      "Talking through multiple repeaters at once",
      "A digital-only radio mode",
      "A way to increase battery life"
    ],
    correctIndex: 0,
    hint: "Are you talking directly or through something else?",
    headlineCorrect: "Exactly.",
    headlineIncorrect: "Close.",
    correctAnswerText: "Direct radio-to-radio communication without a repeater",
    eli5: "Simplex means you talk straight to the other person, with no middle helper involved.",
    whyItMatters: "Simplex is useful when people are close enough or when you want communication that doesn't depend on repeater infrastructure.",
    misconception: "A lot of people assume all radio uses repeaters. It doesn't. Direct communication is still a core part of how it works.",
    wrongAnswerClarification: "Simplex is direct point-to-point, not multi-hop or dependent on infrastructure.",
    continueText: "Direct paths and relay paths serve different needs."
  },
  {
    id: 'vhf_uhf',
    stage: 'infrastructure',
    hook: "Not all radio travels the same way.",
    insight: "Different frequency ranges behave differently in the real world.",
    question: "What is one common difference between VHF and UHF signals?",
    answers: [
      "They can behave differently around terrain and buildings",
      "Only VHF can carry voice",
      "Only UHF can be used in cities",
      "They are exactly the same except for label names"
    ],
    correctIndex: 0,
    hint: "Do all signals behave the same in cities vs open areas?",
    acronym: "VHF (Very High Frequency) and UHF (Ultra High Frequency)",
    headlineCorrect: "This one matters more than it sounds.",
    headlineIncorrect: "Close.",
    correctAnswerText: "They can behave differently around terrain and buildings",
    eli5: "Different parts of the radio spectrum are like different tools. Some are better for open areas. Some handle crowded places better.",
    whyItMatters: "This is part of why one setup works great on a mountain trail and another works better in a city.",
    misconception: "People often assume radio is just radio. But frequency range changes how signal behaves in practice.",
    wrongAnswerClarification: "Both can carry voice and be used anywhere. The difference is how they interact with the environment.",
    continueText: "The environment shapes how signals move."
  },
  {
    id: 'propagation',
    stage: 'infrastructure',
    hook: "The air is not as empty as it looks.",
    insight: "Radio waves interact with the environment in ways that affect how far and how clearly they travel.",
    question: "What does propagation describe in radio communication?",
    answers: [
      "How radio waves travel through the environment",
      "How fast you can speak into a microphone",
      "How a battery stores energy",
      "How often licenses must be renewed"
    ],
    correctIndex: 0,
    hint: "What affects how a signal moves through the world?",
    headlineCorrect: "This word sounds bigger than it is.",
    headlineIncorrect: "Close.",
    correctAnswerText: "How radio waves travel through the environment",
    eli5: "Propagation just means how a signal moves through the world around it.",
    whyItMatters: "This affects range, clarity, and why the same setup can behave differently on different days or in different places.",
    misconception: "People often blame the radio first. Sometimes the environment is the real story.",
    wrongAnswerClarification: "Propagation is about signal movement, not speech, power storage, or licensing.",
    continueText: "Now that you understand how signals move, let's talk about how people share them."
  },

  // ===== STAGE 3: COORDINATION =====
  {
    id: 'callsigns',
    stage: 'coordination',
    hook: "This is the part that sounds the most old-school.",
    insight: "But it's really just how the system knows who's transmitting.",
    question: "What is a call sign used for in amateur radio?",
    answers: [
      "To identify the transmitting station",
      "To boost signal range",
      "To encrypt messages",
      "To connect to repeaters automatically"
    ],
    correctIndex: 0,
    hint: "How would others know it's you speaking?",
    headlineCorrect: "A little formal, but useful.",
    headlineIncorrect: "Close.",
    correctAnswerText: "To identify the transmitting station",
    eli5: "A call sign is like your radio name tag. It tells people who is speaking.",
    whyItMatters: "Identification keeps communication organized and accountable.",
    misconception: "It can sound ceremonial, but it's mostly practical. Systems work better when people can identify who's on the air.",
    wrongAnswerClarification: "Call signs identify stations, they don't affect technical performance or security.",
    continueText: "Identity matters when space is shared."
  },
  {
    id: 'band_plans',
    stage: 'coordination',
    hook: "Even freedom needs a little choreography.",
    insight: "People share the air better when they agree on how different parts of a band are commonly used.",
    question: "What is the purpose of a band plan?",
    answers: [
      "To help organize how frequencies are commonly used",
      "To increase transmitter power",
      "To assign licenses automatically",
      "To make radios easier to manufacture"
    ],
    correctIndex: 0,
    hint: "How do people share space without colliding?",
    headlineCorrect: "It's basically social order.",
    headlineIncorrect: "Close.",
    correctAnswerText: "To help organize how frequencies are commonly used",
    eli5: "A band plan is like deciding which lanes are for which kind of traffic, so everybody doesn't pile into the same space.",
    whyItMatters: "Band plans make it easier for voice, digital, and other activities to coexist without chaos.",
    misconception: "People hear 'plan' and think bureaucracy. It's really about making shared space usable.",
    wrongAnswerClarification: "Band plans organize usage patterns, they don't control technical specifications.",
    continueText: "Structure enables freedom."
  },
  {
    id: 'operating_etiquette',
    stage: 'coordination',
    hook: "Invisible lines keep things from colliding.",
    insight: "Shared systems work better when people leave space, listen first, and avoid stepping on each other.",
    question: "What is one reason operating etiquette matters on the air?",
    answers: [
      "It helps multiple users share frequencies respectfully and clearly",
      "It increases battery life",
      "It changes the modulation type",
      "It removes all interference automatically"
    ],
    correctIndex: 0,
    hint: "What helps shared communication stay smooth?",
    headlineCorrect: "This is social technology.",
    headlineIncorrect: "Close.",
    correctAnswerText: "It helps multiple users share frequencies respectfully and clearly",
    eli5: "When people use the same space, little habits like listening first and speaking clearly keep things from turning into chaos.",
    whyItMatters: "Etiquette makes the whole system more usable, especially when many people share the same frequencies.",
    misconception: "It's easy to frame etiquette as just being nice. It also makes communication function better.",
    wrongAnswerClarification: "Etiquette is behavioral, not technical. It doesn't change hardware performance or eliminate interference.",
    continueText: "Behavior shapes what's possible."
  },
  {
    id: 'listen_first',
    stage: 'coordination',
    hook: "The first move is often not talking.",
    insight: "Before transmitting, it helps to know whether the frequency is already in use.",
    question: "Why is it important to listen before transmitting?",
    answers: [
      "To avoid interrupting ongoing communication",
      "To make your radio charge faster",
      "To automatically connect to a repeater",
      "To increase your call sign range"
    ],
    correctIndex: 0,
    hint: "What's the safest move before speaking?",
    headlineCorrect: "A little patience saves a lot.",
    headlineIncorrect: "Close.",
    correctAnswerText: "To avoid interrupting ongoing communication",
    eli5: "Listening first helps you avoid talking over someone who is already using the channel.",
    whyItMatters: "This is one of the simplest ways to reduce confusion and interference.",
    misconception: "People sometimes rush to transmit because radio feels immediate. The better move is usually to pause first.",
    wrongAnswerClarification: "Listening is a courtesy practice, not a technical optimization for battery, connectivity, or range.",
    continueText: "Sometimes patience is the most powerful tool."
  },
  {
    id: 'ctcss_tones',
    stage: 'coordination',
    hook: "Sometimes the door opens only if you knock the right way.",
    insight: "Some repeaters require a specific tone before they respond.",
    question: "Why might a repeater require a tone such as CTCSS?",
    answers: [
      "To help control access and reduce unwanted activation",
      "To make voices higher-pitched",
      "To increase antenna length",
      "To replace the call sign"
    ],
    correctIndex: 0,
    hint: "How might a system decide whether to respond to you?",
    acronym: "CTCSS (Continuous Tone-Coded Squelch System)",
    headlineCorrect: "A little gatekeeping, but useful.",
    headlineIncorrect: "Close.",
    correctAnswerText: "To help control access and reduce unwanted activation",
    eli5: "The repeater listens for a specific sub-audible tone before it decides to wake up and relay your signal.",
    whyItMatters: "This helps keep repeaters from reacting to every random signal or noise that lands nearby.",
    misconception: "The tone isn't there to make you sound better. It's mostly there to help the repeater decide when to respond.",
    wrongAnswerClarification: "CTCSS is an access control mechanism, not an audio enhancement.",
    continueText: "Access control keeps systems clean."
  },
  {
    id: 'offset',
    stage: 'coordination',
    hook: "This is where one frequency quietly becomes two.",
    insight: "Repeaters often listen on one frequency and transmit on another nearby frequency.",
    question: "What is a repeater offset?",
    answers: [
      "The difference between a repeater's transmit and receive frequencies",
      "The delay before a repeater turns on",
      "The amount of extra power a repeater uses",
      "A code used to identify the repeater owner"
    ],
    correctIndex: 0,
    hint: "How can something listen and talk without interfering with itself?",
    headlineCorrect: "A little hidden plumbing.",
    headlineIncorrect: "Close.",
    correctAnswerText: "The difference between a repeater's transmit and receive frequencies",
    eli5: "A repeater has to listen and talk without tripping over itself, so it uses two slightly different frequencies.",
    whyItMatters: "Understanding offset is part of getting repeaters to work correctly instead of wondering why nothing is happening.",
    misconception: "People often assume using a repeater means one single channel. Under the hood, it's more coordinated than that.",
    wrongAnswerClarification: "Offset is frequency separation, not timing or power characteristics.",
    continueText: "Separation prevents collision."
  },
  {
    id: 'duplex_operation',
    stage: 'coordination',
    hook: "Listening and talking can happen in more than one rhythm.",
    insight: "Some systems use separate paths for transmitting and receiving instead of sharing one back and forth.",
    question: "What does duplex operation mean in radio?",
    answers: [
      "Transmitting and receiving on different frequencies",
      "Using two antennas at the same time only",
      "Speaking twice as fast",
      "Combining two call signs"
    ],
    correctIndex: 0,
    hint: "Can sending and receiving happen on separate paths?",
    headlineCorrect: "A split setup.",
    headlineIncorrect: "Close.",
    correctAnswerText: "Transmitting and receiving on different frequencies",
    eli5: "Instead of trying to talk and listen on the exact same path, duplex uses separate frequencies for each direction.",
    whyItMatters: "This is part of how repeaters and other systems avoid stepping on themselves.",
    misconception: "Duplex isn't just 'more advanced radio.' It's specifically about separating transmit and receive paths.",
    wrongAnswerClarification: "Duplex describes frequency separation for simultaneous communication, not antenna count or speed.",
    continueText: "Now let's look at what's physically making this happen."
  },

  // ===== STAGE 4: EQUIPMENT =====
  {
    id: 'antennas',
    stage: 'equipment',
    hook: "This part gets ignored.",
    insight: "But it changes everything.",
    question: "What does an antenna do?",
    answers: [
      "Sends and receives radio waves",
      "Stores signals",
      "Amplifies sound",
      "Creates electricity"
    ],
    correctIndex: 0,
    hint: "What actually connects your device to the air?",
    headlineCorrect: "This is a big one.",
    headlineIncorrect: "Easy mix-up.",
    correctAnswerText: "Sends and receives radio waves",
    eli5: "Your antenna is the bridge between your radio and the air.",
    whyItMatters: "A better antenna can improve performance more than power.",
    misconception: "The radio isn't the whole system. The antenna matters just as much.",
    wrongAnswerClarification: "Antennas don't store, amplify audio, or generate power. They convert electrical energy to radio waves and back.",
    continueText: "The bridge to the air matters more than most realize."
  },
  {
    id: 'coax',
    stage: 'equipment',
    hook: "Even the cable matters.",
    insight: "A radio setup is not just the radio and the antenna. The path between them matters too.",
    question: "What is coaxial cable used for in a radio station?",
    answers: [
      "To carry radio-frequency energy between equipment and antenna",
      "To cool down the transmitter",
      "To store power for emergencies",
      "To encode digital messages"
    ],
    correctIndex: 0,
    hint: "How does the signal get from the radio to the antenna?",
    headlineCorrect: "The middle still counts.",
    headlineIncorrect: "Easy mix-up.",
    correctAnswerText: "To carry radio-frequency energy between equipment and antenna",
    eli5: "Coax is the cable that carries the signal from your radio to the antenna, kind of like a dedicated path between the two.",
    whyItMatters: "Cable quality and length can affect how much of your signal actually makes it where it's supposed to go.",
    misconception: "It's easy to treat the cable like a boring accessory. It's part of the performance.",
    wrongAnswerClarification: "Coax doesn't cool, store power, or encode messages. It's purely a signal path.",
    continueText: "The path is part of the system."
  },
  {
    id: 'feedline_loss',
    stage: 'equipment',
    hook: "Not all of your signal makes the trip.",
    insight: "Energy can be lost as it travels between your radio and antenna.",
    question: "What is feedline loss?",
    answers: [
      "Signal power lost in the cable between radio and antenna",
      "Noise from nearby radios",
      "Loss of battery charge",
      "Antenna failure"
    ],
    correctIndex: 0,
    hint: "Does all of your signal actually make it to the antenna?",
    headlineCorrect: "Exactly.",
    headlineIncorrect: "Close.",
    correctAnswerText: "Signal power lost in the cable between radio and antenna",
    eli5: "As your signal travels through the cable, a little bit of it fades away as heat.",
    whyItMatters: "Long or low-quality cables can reduce how much of your signal actually reaches the antenna.",
    misconception: "People assume all signal loss happens in the air. Some of it happens before it even gets there.",
    wrongAnswerClarification: "The other options describe different issues, but feedline loss specifically happens in the cable.",
    continueText: "Efficiency matters in every piece."
  },
  {
    id: 'swr',
    stage: 'equipment',
    hook: "Not all of your signal wants to leave politely.",
    insight: "Sometimes part of the transmitted energy reflects back instead of moving efficiently out through the antenna.",
    question: "What does SWR help indicate in a radio system?",
    answers: [
      "How well the transmitter, feed line, and antenna are matched",
      "How long the battery will last",
      "How clear your voice sounds",
      "How many repeaters are nearby"
    ],
    correctIndex: 0,
    hint: "What happens if energy can't move forward cleanly?",
    acronym: "SWR (Standing Wave Ratio)",
    headlineCorrect: "A quiet but important clue.",
    headlineIncorrect: "Close.",
    correctAnswerText: "How well the transmitter, feed line, and antenna are matched",
    eli5: "If the radio system is mismatched, some of the energy sort of bounces back instead of heading outward the way you want.",
    whyItMatters: "SWR helps you spot whether your setup is working efficiently or wasting signal.",
    misconception: "People often think SWR is about how powerful a radio is. It's more about how well the pieces are working together.",
    wrongAnswerClarification: "The other options focus on separate concerns. SWR is specifically about how well components work together electrically.",
    continueText: "Matching matters as much as power."
  },
  {
    id: 'grounding',
    stage: 'equipment',
    hook: "Not glamorous. Very important.",
    insight: "Some parts of radio setup are less about excitement and more about not frying equipment or creating hazards.",
    question: "Why is proper grounding important in a radio station setup?",
    answers: [
      "It can improve safety and help protect equipment",
      "It increases frequency",
      "It makes voices sound louder",
      "It replaces the need for an antenna"
    ],
    correctIndex: 0,
    hint: "Where does unwanted electrical energy go?",
    headlineCorrect: "The boring stuff is still the good stuff.",
    headlineIncorrect: "Close.",
    correctAnswerText: "It can improve safety and help protect equipment",
    eli5: "Grounding helps unwanted electrical energy go somewhere safer instead of causing trouble where you don't want it.",
    whyItMatters: "This matters for both safety and equipment protection.",
    misconception: "It's easy to ignore setup details when the fun part is talking over the air. But good systems depend on invisible fundamentals.",
    wrongAnswerClarification: "Grounding is about safety and protection, not signal characteristics.",
    continueText: "Safety enables everything else."
  },
  {
    id: 'breaker_and_fuse',
    stage: 'equipment',
    hook: "Sometimes you bounce upward first.",
    insight: "Protection devices sit between your equipment and potential problems.",
    question: "Why are fuses or circuit protection devices used in radio equipment?",
    answers: [
      "To help protect equipment and wiring from excessive current",
      "To improve call sign pronunciation",
      "To increase antenna gain",
      "To reduce the need for grounding"
    ],
    correctIndex: 0,
    hint: "What protects systems when too much flows?",
    headlineCorrect: "Quietly heroic.",
    headlineIncorrect: "Easy mix-up.",
    correctAnswerText: "To help protect equipment and wiring from excessive current",
    eli5: "If too much electrical current tries to move through the system, protection devices can interrupt it before more damage happens.",
    whyItMatters: "Protective components are part of building a setup that is not just functional, but safe.",
    misconception: "They're easy to ignore because they don't feel like the fun part. They matter precisely when something goes wrong.",
    wrongAnswerClarification: "Fuses and protection are electrical safety components, not performance or audio enhancements.",
    continueText: "Protection is invisible until it's needed."
  },
  {
    id: 'microphone_gain',
    stage: 'equipment',
    hook: "Louder is not always clearer.",
    insight: "Audio settings can affect how understandable your voice is, not just how intense it feels.",
    question: "What can happen if microphone gain is set too high?",
    answers: [
      "Your transmitted audio may sound distorted",
      "Your frequency changes automatically",
      "The antenna becomes more efficient",
      "You no longer need a call sign"
    ],
    correctIndex: 0,
    hint: "Can louder ever make something harder to understand?",
    headlineCorrect: "Volume can become mess.",
    headlineIncorrect: "Easy mix-up.",
    correctAnswerText: "Your transmitted audio may sound distorted",
    eli5: "If you push the mic level too high, your voice can get overloaded and messy instead of clear.",
    whyItMatters: "Clear communication depends on understandable audio, not just strong audio.",
    misconception: "People often assume boosting levels always helps. Past a point, it can make things worse.",
    wrongAnswerClarification: "Mic gain affects audio quality, not frequency, antenna performance, or licensing requirements.",
    continueText: "Clarity beats volume."
  },

  // ===== STAGE 5: ADVANCED =====
  {
    id: 'digital_modes',
    stage: 'advanced',
    hook: "Radio is not stuck in the past.",
    insight: "Signals can carry digital information too, not just voice.",
    question: "What is one thing digital modes can do in amateur radio?",
    answers: [
      "Transmit data using radio signals",
      "Replace antennas entirely",
      "Eliminate the need for frequencies",
      "Make licenses unnecessary"
    ],
    correctIndex: 0,
    hint: "Can radio carry more than just voice?",
    headlineCorrect: "Still radio. Just another layer.",
    headlineIncorrect: "Close.",
    correctAnswerText: "Transmit data using radio signals",
    eli5: "Instead of carrying only voice, radio can also carry data and other kinds of digital information.",
    whyItMatters: "This connects radio much more directly to the kinds of communication systems people think of as modern.",
    misconception: "People often imagine ham radio as only voice conversations. It includes much more than that.",
    wrongAnswerClarification: "Digital modes extend radio's capability, but they don't eliminate the need for physical infrastructure or licensing.",
    continueText: "Old technology can carry new ideas."
  },
  {
    id: 'aprs',
    stage: 'advanced',
    hook: "Yes, radio can tell people where you are.",
    insight: "Some radio systems can send little packets of information, like location or short status updates.",
    question: "What is one purpose of systems like APRS?",
    answers: [
      "Sharing position and status information over radio",
      "Increasing microphone volume",
      "Replacing repeaters permanently",
      "Creating electrical grounding"
    ],
    correctIndex: 0,
    hint: "Can signals carry small pieces of data like location?",
    acronym: "APRS (Automatic Packet Reporting System)",
    headlineCorrect: "Not exactly low-tech, huh?",
    headlineIncorrect: "Close.",
    correctAnswerText: "Sharing position and status information over radio",
    eli5: "Some radio systems can send little packets of information, like location or short status updates.",
    whyItMatters: "This shows how amateur radio can support mapping, tracking, and data sharing in addition to voice.",
    misconception: "People sometimes assume radio is only for talking. It can also move useful little pieces of data around.",
    wrongAnswerClarification: "APRS is a data protocol, not an audio enhancement or infrastructure replacement.",
    continueText: "Data flows where voice once ruled."
  },
  {
    id: 'bandwidth',
    stage: 'advanced',
    hook: "Not all signals take up the same space.",
    insight: "Signals occupy a portion of the frequency spectrum.",
    question: "What does bandwidth describe?",
    answers: [
      "The width of frequencies a signal occupies",
      "How strong a signal is",
      "How far it travels",
      "How long it lasts"
    ],
    correctIndex: 0,
    hint: "How much space does your signal take up?",
    headlineCorrect: "That's it.",
    headlineIncorrect: "Close.",
    correctAnswerText: "The width of frequencies a signal occupies",
    eli5: "Bandwidth is how much space your signal takes up on the frequency spectrum.",
    whyItMatters: "More bandwidth can carry more information, but it also takes up more shared space.",
    misconception: "People mix this up with strength or distance. It's really about space.",
    wrongAnswerClarification: "Signal strength and range are different concepts — bandwidth is about how wide the signal is.",
    continueText: "Width determines capacity."
  },
  {
    id: 'fm_am',
    stage: 'advanced',
    hook: "These aren't just labels.",
    insight: "They describe different ways of carrying information on a signal.",
    question: "What is a key difference between FM and AM?",
    answers: [
      "They encode information differently onto a signal",
      "FM only works at night",
      "AM cannot carry voice",
      "They are identical"
    ],
    correctIndex: 0,
    hint: "Are all signals shaped the same way?",
    acronym: "FM (Frequency Modulation) and AM (Amplitude Modulation)",
    headlineCorrect: "Exactly.",
    headlineIncorrect: "Almost.",
    correctAnswerText: "They encode information differently onto a signal",
    eli5: "FM and AM change different parts of the signal to carry information.",
    whyItMatters: "Different methods affect clarity, noise resistance, and range.",
    misconception: "People think they're just labels. They describe real technical differences.",
    wrongAnswerClarification: "The other options confuse behavior with encoding — the key difference is how the signal is shaped.",
    continueText: "Different shapes serve different purposes."
  },
  {
    id: 'noise_floor',
    stage: 'advanced',
    hook: "There's always a background.",
    insight: "Even when no one is transmitting, the air isn't silent.",
    question: "What is the noise floor?",
    answers: [
      "The level of background noise in a system",
      "The loudest possible signal",
      "A type of antenna",
      "A battery limitation"
    ],
    correctIndex: 0,
    hint: "Is the air ever truly silent?",
    headlineCorrect: "Exactly.",
    headlineIncorrect: "Close.",
    correctAnswerText: "The level of background noise in a system",
    eli5: "There's always some low-level static in the background, even when nothing is happening.",
    whyItMatters: "Signals need to be stronger than the noise floor to be understood.",
    misconception: "People assume silence means no signal. There's always some baseline noise.",
    wrongAnswerClarification: "The noise floor isn't about maximum power — it's about the minimum background level.",
    continueText: "Silence is never truly silent."
  },
  {
    id: 'polarization',
    stage: 'advanced',
    hook: "Orientation matters more than it seems.",
    insight: "Radio waves have direction, not just movement.",
    question: "What does polarization refer to?",
    answers: [
      "The orientation of a radio wave",
      "The strength of a signal",
      "The frequency of a signal",
      "The type of battery used"
    ],
    correctIndex: 0,
    hint: "Does direction or orientation affect signals?",
    headlineCorrect: "Yep.",
    headlineIncorrect: "Easy mix-up.",
    correctAnswerText: "The orientation of a radio wave",
    eli5: "Signals can be oriented up-and-down or side-to-side, like how something is tilted.",
    whyItMatters: "Matching polarization between antennas can improve signal clarity and strength.",
    misconception: "People often think only frequency matters. Orientation plays a role too.",
    wrongAnswerClarification: "Signal strength and frequency are different properties — polarization is about direction.",
    continueText: "Alignment unlocks clarity."
  },
  {
    id: 'weather_effects',
    stage: 'advanced',
    hook: "The air changes more than you think.",
    insight: "Environmental conditions can affect how signals travel.",
    question: "How can weather affect radio signals?",
    answers: [
      "It can change how signals travel through the atmosphere",
      "It changes the call sign",
      "It eliminates interference",
      "It replaces antennas"
    ],
    correctIndex: 0,
    hint: "Can the environment change how signals behave?",
    headlineCorrect: "Exactly.",
    headlineIncorrect: "Close.",
    correctAnswerText: "It can change how signals travel through the atmosphere",
    eli5: "Things like temperature and moisture can bend or change how signals move.",
    whyItMatters: "This explains why signal performance can vary from day to day.",
    misconception: "People expect consistent performance. Conditions can shift behavior.",
    wrongAnswerClarification: "Weather affects signal travel, not identity or equipment function.",
    continueText: "The invisible shapes the possible."
  },
  {
    id: 'ground_wave',
    stage: 'advanced',
    hook: "Some signals hug the earth.",
    insight: "Not all signals travel in straight lines through the air.",
    question: "What is a ground wave?",
    answers: [
      "A signal that travels along the Earth's surface",
      "A signal sent underground",
      "A signal only used at night",
      "A signal that requires satellites"
    ],
    correctIndex: 0,
    hint: "Do all signals travel straight through the air?",
    headlineCorrect: "Yep.",
    headlineIncorrect: "Easy mix-up.",
    correctAnswerText: "A signal that travels along the Earth's surface",
    eli5: "Some signals follow the curve of the ground instead of going straight out.",
    whyItMatters: "This helps explain how certain signals reach beyond line-of-sight.",
    misconception: "Signals don't always travel in straight lines. Some follow the earth.",
    wrongAnswerClarification: "Ground waves don't go underground or require satellites — they follow the surface.",
    continueText: "Paths are more varied than they appear."
  },
  {
    id: 'skip_propagation',
    stage: 'advanced',
    hook: "Sometimes signals bounce back.",
    insight: "Signals can reflect off layers in the atmosphere.",
    question: "What is skip propagation?",
    answers: [
      "Signals bouncing off the atmosphere to reach distant locations",
      "Signals skipping over antennas",
      "Signals being lost completely",
      "Signals increasing in power automatically"
    ],
    correctIndex: 0,
    hint: "Can signals bounce and travel farther than expected?",
    headlineCorrect: "Exactly.",
    headlineIncorrect: "Close.",
    correctAnswerText: "Signals bouncing off the atmosphere to reach distant locations",
    eli5: "Some signals travel up, bounce off the atmosphere, and come back down far away.",
    whyItMatters: "This enables long-distance communication beyond normal range.",
    misconception: "People assume distance is always limited by power. Sometimes the atmosphere helps.",
    wrongAnswerClarification: "Skip isn't loss or power gain — it's reflection that extends range.",
    continueText: "The sky can be a mirror."
  },
  {
    id: 'emergency_power',
    stage: 'advanced',
    hook: "The radio is only as awake as its power source.",
    insight: "A working radio still needs electricity, even when everything else feels stripped down.",
    question: "Why is backup power useful for radio communication?",
    answers: [
      "It lets equipment keep working when main power is unavailable",
      "It changes the radio frequency automatically",
      "It prevents all interference",
      "It replaces the antenna"
    ],
    correctIndex: 0,
    hint: "What happens when the wall stops giving power?",
    headlineCorrect: "Pretty simple, actually.",
    headlineIncorrect: "Close.",
    correctAnswerText: "It lets equipment keep working when main power is unavailable",
    eli5: "If the wall stops giving power, a backup source keeps your radio alive.",
    whyItMatters: "This is one reason radio stays relevant in uncertain conditions: it can run on simpler, smaller power setups than many modern systems.",
    misconception: "People sometimes imagine radio works by magic once you own the gear. It still needs energy.",
    wrongAnswerClarification: "Backup power provides continuity, not technical changes.",
    continueText: "Independence requires preparation."
  },
  {
    id: 'battery_types',
    stage: 'advanced',
    hook: "None of this works if it can't stay on.",
    insight: "Power sources quietly shape how and where communication can happen.",
    question: "Why are rechargeable batteries commonly used in radio equipment?",
    answers: [
      "They can be reused and provide ongoing power",
      "They increase signal frequency",
      "They eliminate antennas",
      "They reduce interference"
    ],
    correctIndex: 0,
    hint: "What lets your system keep working over time?",
    headlineCorrect: "Yep.",
    headlineIncorrect: "Easy mix-up.",
    correctAnswerText: "They can be reused and provide ongoing power",
    eli5: "Rechargeable batteries let you use power again instead of throwing it away after one use.",
    whyItMatters: "Reliable power makes radio useful in more places, especially when outlets aren't available.",
    misconception: "It's easy to think batteries don't matter much. They shape how long and where your system works.",
    wrongAnswerClarification: "Other answers focus on signal behavior, but batteries only affect power, not how signals behave.",
    continueText: "Sustainability extends reach."
  },
  {
    id: 'rf_exposure',
    stage: 'advanced',
    hook: "Even useful things need boundaries.",
    insight: "Radio-frequency energy is useful, but it still needs to be handled responsibly.",
    question: "Why should operators be aware of RF exposure safety?",
    answers: [
      "Because transmitting equipment should be used within safe exposure limits",
      "Because RF makes batteries explode instantly",
      "Because RF replaces grounding",
      "Because RF removes the need for licenses"
    ],
    correctIndex: 0,
    hint: "Does invisible energy still need limits?",
    acronym: "RF (Radio Frequency)",
    headlineCorrect: "Useful things still need rules.",
    headlineIncorrect: "Close.",
    correctAnswerText: "Because transmitting equipment should be used within safe exposure limits",
    eli5: "Radio energy is part of how communication works, but you still want to use it in ways that stay within safe limits.",
    whyItMatters: "Understanding exposure safety is part of responsible station setup and operation.",
    misconception: "People may assume safety only matters in giant commercial systems. Even hobby equipment needs thoughtful use.",
    wrongAnswerClarification: "RF safety is about responsible exposure management, not catastrophic equipment failures or licensing shortcuts.",
    continueText: "Responsibility shapes longevity."
  },
  {
    id: 'public_service',
    stage: 'advanced',
    hook: "This skill has a community side.",
    insight: "Amateur radio is often used to support events, coordination, and communication needs beyond personal experimentation.",
    question: "Why do amateur radio operators sometimes assist with public service events?",
    answers: [
      "To help support communication and coordination",
      "To replace all local government systems",
      "To avoid needing licenses",
      "To increase personal transmitter power"
    ],
    correctIndex: 0,
    hint: "Where might communication help groups coordinate?",
    headlineCorrect: "It's not just a solo hobby.",
    headlineIncorrect: "Easy mix-up.",
    correctAnswerText: "To help support communication and coordination",
    eli5: "Radio can help groups stay coordinated, especially when lots of people or moving parts are involved.",
    whyItMatters: "This is part of why amateur radio still matters: it can be useful in real shared situations, not just private tinkering.",
    misconception: "It's easy to picture one person alone with equipment. In reality, there's often a strong community and service element.",
    wrongAnswerClarification: "Public service is about providing support, not replacing infrastructure or bypassing licensing.",
    continueText: "Communication connects communities."
  }
];

export const totalConcepts = learnFlowConcepts.length;
export const stageBreakpoints = {
  intuition: 4,
  infrastructure: 8,
  coordination: 15,
  equipment: 22,
  advanced: 36
};

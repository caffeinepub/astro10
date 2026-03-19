export interface ZodiacSign {
  name: string;
  symbol: string;
  emoji: string;
  dateRange: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  element: string;
  color: string;
  horoscope: string;
  love: string;
  career: string;
  life: string;
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    name: "Aries",
    symbol: "♈",
    emoji: "🐏",
    dateRange: "Mar 21 – Apr 19",
    startMonth: 3,
    startDay: 21,
    endMonth: 4,
    endDay: 19,
    element: "Fire",
    color: "#ff6b6b",
    horoscope:
      "Today the cosmos ignites your warrior spirit. Bold decisions bring remarkable breakthroughs. Trust your instincts and charge forward with confidence.",
    love: "Venus aligns with your ruling Mars, creating electric romantic energy. A bold gesture captures someone special's attention. If committed, plan a spontaneous date night.",
    career:
      "Your natural leadership shines under current planetary transits. A project you've been pushing for finally gains momentum. Colleagues look to you for direction.",
    life: "High energy propels you toward your goals today. Channel this fire productively. Physical exercise helps ground your restless spirit and sharpen your focus.",
  },
  {
    name: "Taurus",
    symbol: "♉",
    emoji: "🐂",
    dateRange: "Apr 20 – May 20",
    startMonth: 4,
    startDay: 20,
    endMonth: 5,
    endDay: 20,
    element: "Earth",
    color: "#51cf66",
    horoscope:
      "Venus, your ruler, blesses your endeavors with beauty and abundance. Material and emotional comforts align. A period of steady growth rewards your patience.",
    love: "Your sensual nature draws admirers like moths to a flame. The stars encourage you to express your feelings openly. A slow-building connection deepens meaningfully.",
    career:
      "Financial acumen is your superpower today. A business proposal or investment opportunity deserves careful consideration. Your steady approach yields long-term rewards.",
    life: "Ground yourself in nature's rhythms for renewal. Your body craves nourishment — cook a beautiful meal, visit a garden. Slow down to absorb life's richness.",
  },
  {
    name: "Gemini",
    symbol: "♊",
    emoji: "👯",
    dateRange: "May 21 – Jun 20",
    startMonth: 5,
    startDay: 21,
    endMonth: 6,
    endDay: 20,
    element: "Air",
    color: "#ffd43b",
    horoscope:
      "Mercury's swift energy sharpens your wit and communication. Conversations spark new ideas and unexpected connections. Your adaptability is your greatest asset today.",
    love: "Your charm is at peak brilliance — use it wisely. An intellectual connection blossoms into something deeper. Playful banter opens doors to genuine intimacy.",
    career:
      "Ideas flow like a river in full flood. Document every insight — your creativity is at a rare peak. A communication breakthrough transforms a stalled project.",
    life: "Your mind races between possibilities. Choose two or three meaningful pursuits rather than scattering energy across twenty. Focus amplifies your innate brilliance.",
  },
  {
    name: "Cancer",
    symbol: "♋",
    emoji: "🦀",
    dateRange: "Jun 21 – Jul 22",
    startMonth: 6,
    startDay: 21,
    endMonth: 7,
    endDay: 22,
    element: "Water",
    color: "#74c0fc",
    horoscope:
      "The Moon's tender light illuminates your emotional depths. Home and family take center stage. Your intuition is a compass pointing true north today.",
    love: "Your nurturing soul creates a magnetic warmth that draws love to you. Open your heart without fear of vulnerability. The right person cherishes your emotional depth.",
    career:
      "Your empathic leadership creates team harmony that multiplies productivity. Trust your gut about a colleague's true intentions. Creative projects flourish under your care.",
    life: "Emotional tides run high — honor your feelings without being swept away. Create a sanctuary at home that restores your spirit. Ancestral wisdom offers surprising guidance.",
  },
  {
    name: "Leo",
    symbol: "♌",
    emoji: "🦁",
    dateRange: "Jul 23 – Aug 22",
    startMonth: 7,
    startDay: 23,
    endMonth: 8,
    endDay: 22,
    element: "Fire",
    color: "#ff9f43",
    horoscope:
      "The Sun, your sovereign ruler, radiates magnificent power through your sign. Your charisma is irresistible and your creative gifts demand expression. Claim your spotlight.",
    love: "Romantic passion burns brilliantly in your heart. Grand gestures create unforgettable memories. Your generous love inspires the same devotion in return.",
    career:
      "Leadership opportunities arrive with impeccable timing. Your vision inspires others to exceed their potential. A creative presentation wins over even the most skeptical audience.",
    life: "Your vitality is electric — use it to pursue dreams you've postponed. Joy is not a luxury but your birthright. Let laughter and play restore your magnificent spirit.",
  },
  {
    name: "Virgo",
    symbol: "♍",
    emoji: "🌾",
    dateRange: "Aug 23 – Sep 22",
    startMonth: 8,
    startDay: 23,
    endMonth: 9,
    endDay: 22,
    element: "Earth",
    color: "#a9e34b",
    horoscope:
      "Mercury fine-tunes your analytical mind to extraordinary precision. Details others miss become your competitive advantage. Systematic effort creates flawless results.",
    love: "Your devotion expresses through thoughtful acts of service. A partner notices the care you pour into small gestures. Articulate your deeper feelings — they deserve to be heard.",
    career:
      "Your meticulous approach solves a complex problem that stumped others. Recognition comes from unexpected quarters. A health or wellness initiative at work gains traction.",
    life: "Order in your environment creates clarity in your mind. Tackle that organizational project you've been postponing. Small daily rituals compound into extraordinary long-term results.",
  },
  {
    name: "Libra",
    symbol: "♎",
    emoji: "⚖️",
    dateRange: "Sep 23 – Oct 22",
    startMonth: 9,
    startDay: 23,
    endMonth: 10,
    endDay: 22,
    element: "Air",
    color: "#f8a5c2",
    horoscope:
      "Venus harmonizes all your relationships with exquisite grace. Balance is restored where discord lingered. Your diplomatic gifts transform conflicts into cooperation.",
    love: "Partnership energy surges powerfully. A soulmate connection deepens through honest conversation. Your natural charm creates harmony and attraction in equal measure.",
    career:
      "Collaboration yields breakthrough results today. Your ability to see multiple perspectives makes you the essential mediator. A long-standing professional dispute finds elegant resolution.",
    life: "Beauty nourishes your soul — seek it actively in art, music, and nature. Creating aesthetic harmony in your space elevates your entire wellbeing and creative output.",
  },
  {
    name: "Scorpio",
    symbol: "♏",
    emoji: "🦂",
    dateRange: "Oct 23 – Nov 21",
    startMonth: 10,
    startDay: 23,
    endMonth: 11,
    endDay: 21,
    element: "Water",
    color: "#cc5de8",
    horoscope:
      "Pluto's transformative power works deep magic in your life. Hidden truths surface, bringing liberation rather than disruption. Your resilience carries you through profound change.",
    love: "Intense emotional currents create magnetic attraction. A connection that reaches soul-deep levels transforms you both. Trust vulnerability — it is where true intimacy lives.",
    career:
      "Your investigative instincts uncover a crucial insight that changes everything. Research and deep analysis reveal opportunities hidden in plain sight. Power dynamics shift in your favor.",
    life: "You are in a chrysalis phase — transformation feels uncomfortable but creates something magnificent. Release what no longer serves your evolution with gratitude and courage.",
  },
  {
    name: "Sagittarius",
    symbol: "♐",
    emoji: "🏹",
    dateRange: "Nov 22 – Dec 21",
    startMonth: 11,
    startDay: 22,
    endMonth: 12,
    endDay: 21,
    element: "Fire",
    color: "#ff6348",
    horoscope:
      "Jupiter expands every horizon before you. Adventure calls with irresistible urgency. Your philosophical mind grasps truths that elude more cautious souls. Aim higher.",
    love: "Your magnetic optimism attracts romantic adventure. A connection from abroad or a meeting while traveling holds special significance. Freedom within partnership is your sacred need.",
    career:
      "International opportunities or educational endeavors amplify your career trajectory. Your vision inspires a team to pursue an ambitious goal everyone believed impossible.",
    life: "A journey — literal or philosophical — expands your understanding of what is possible. Books, travel, and diverse conversations are the fuel your spirit requires to thrive.",
  },
  {
    name: "Capricorn",
    symbol: "♑",
    emoji: "🐐",
    dateRange: "Dec 22 – Jan 19",
    startMonth: 12,
    startDay: 22,
    endMonth: 1,
    endDay: 19,
    element: "Earth",
    color: "#868e96",
    horoscope:
      "Saturn's disciplined energy rewards your patient, strategic approach. The mountain summit grows closer with each determined step. Authority figures recognize your exceptional reliability.",
    love: "Your commitment creates a rock-solid foundation for lasting love. A relationship matures into a deeper partnership. Show your tender, vulnerable side — it strengthens your bond.",
    career:
      "Executive decisions made today shape your professional legacy. Your long-term strategic thinking outmaneuvers short-sighted competition. A promotion or advancement is within grasp.",
    life: "Your disciplined mind is your greatest asset. Balance ambition with genuine rest — the body needs recovery as much as the career needs advancement. Celebrate small victories.",
  },
  {
    name: "Aquarius",
    symbol: "♒",
    emoji: "🏺",
    dateRange: "Jan 20 – Feb 18",
    startMonth: 1,
    startDay: 20,
    endMonth: 2,
    endDay: 18,
    element: "Air",
    color: "#4dabf7",
    horoscope:
      "Uranus sparks revolutionary ideas that could change your world. Your visionary perspective sees solutions where others see only problems. Innovation is your superpower today.",
    love: "Unconventional romance suits your unique soul. A meeting of minds creates electric romantic chemistry. Authenticity is more attractive than any mask you might wear.",
    career:
      "Technology or humanitarian projects align with your deepest purpose. Your innovative approach to an old problem generates genuine excitement. A network connection opens unexpected doors.",
    life: "Your highest self serves both individual growth and collective evolution. Community, causes, and cutting-edge ideas electrify your spirit. Embrace your beautiful eccentricity fully.",
  },
  {
    name: "Pisces",
    symbol: "♓",
    emoji: "🐠",
    dateRange: "Feb 19 – Mar 20",
    startMonth: 2,
    startDay: 19,
    endMonth: 3,
    endDay: 20,
    element: "Water",
    color: "#63e6be",
    horoscope:
      "Neptune weaves enchanting magic through your perceptions. Creative and spiritual gifts flow at peak expression. Dreams carry profound messages from your deepest wisdom.",
    love: "Your boundless compassion creates a love that transcends the ordinary. A soulmate connection speaks without words. Trust your intuition about a romantic situation — it is unerringly accurate.",
    career:
      "Creative, artistic, or healing work fulfills your soul's calling today. Your empathic insight makes you invaluable in collaborative settings. Trust an inspired vision even when it defies logic.",
    life: "Your spiritual sensitivity is a gift, not a burden. Meditation, art, or time near water restores your luminous energy. Healthy boundaries protect your compassionate heart.",
  },
];

export function getZodiacFromDate(month: number, day: number): ZodiacSign {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
    return ZODIAC_SIGNS[0];
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
    return ZODIAC_SIGNS[1];
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
    return ZODIAC_SIGNS[2];
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
    return ZODIAC_SIGNS[3];
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22))
    return ZODIAC_SIGNS[4];
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
    return ZODIAC_SIGNS[5];
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
    return ZODIAC_SIGNS[6];
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return ZODIAC_SIGNS[7];
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return ZODIAC_SIGNS[8];
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    return ZODIAC_SIGNS[9];
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return ZODIAC_SIGNS[10];
  return ZODIAC_SIGNS[11];
}

export function getAIResponse(zodiac: ZodiacSign, message: string): string {
  const msg = message.toLowerCase();
  const responses: Record<string, string[]> = {
    love: [
      zodiac.love,
      `The stars align favorably for ${zodiac.name} in matters of the heart. ${zodiac.element} energy amplifies your romantic magnetism.`,
      `Venus whispers secrets meant only for ${zodiac.name} souls — your emotional authenticity is your greatest romantic gift.`,
    ],
    career: [
      zodiac.career,
      `${zodiac.name}'s planetary alignment strongly supports professional advancement. Your ${zodiac.element} nature brings unique gifts to any workplace.`,
      `The cosmos signals breakthrough potential in your career. Your ${zodiac.name} perseverance will be rewarded significantly.`,
    ],
    money: [
      `Financial currents flow favorably for ${zodiac.name} this period. ${zodiac.element} energy grounds your material instincts.`,
      `A wise investment or unexpected income opportunity surfaces. Your ${zodiac.name} intuition guides sound financial decisions.`,
    ],
    health: [
      `Your ${zodiac.element} constitution requires specific attention now. Honor your body's signals and prioritize restorative practices.`,
      `${zodiac.name} energy encourages a holistic approach to wellness. Mind, body, and spirit alignment unlocks remarkable vitality.`,
    ],
    future: [
      zodiac.life,
      `The next three months bring significant shifts aligned with ${zodiac.name}'s evolutionary journey. Embrace change with the confidence of ${zodiac.element}.`,
    ],
    general: [
      zodiac.horoscope,
      `As a ${zodiac.name} (${zodiac.symbol}), your ${zodiac.element} nature positions you perfectly for what the cosmos has prepared. The stars see your true potential.`,
      `${zodiac.name} energy is strong today. Your ruling energy guides you toward authentic expression and meaningful connection.`,
    ],
  };

  let category = "general";
  if (
    msg.includes("love") ||
    msg.includes("relationship") ||
    msg.includes("partner") ||
    msg.includes("romance") ||
    msg.includes("marriage") ||
    msg.includes("soulmate")
  )
    category = "love";
  else if (
    msg.includes("career") ||
    msg.includes("job") ||
    msg.includes("work") ||
    msg.includes("business") ||
    msg.includes("promotion") ||
    msg.includes("boss")
  )
    category = "career";
  else if (
    msg.includes("money") ||
    msg.includes("finance") ||
    msg.includes("wealth") ||
    msg.includes("investment") ||
    msg.includes("salary")
  )
    category = "money";
  else if (
    msg.includes("health") ||
    msg.includes("body") ||
    msg.includes("wellness") ||
    msg.includes("fitness") ||
    msg.includes("sick")
  )
    category = "health";
  else if (
    msg.includes("future") ||
    msg.includes("prediction") ||
    msg.includes("destiny") ||
    msg.includes("fate") ||
    msg.includes("year") ||
    msg.includes("month")
  )
    category = "future";

  const pool = responses[category];
  return pool[Math.floor(Math.random() * pool.length)];
}

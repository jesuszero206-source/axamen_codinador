const typeTranslations: Record<string, string> = {
  'Normal Monster': 'Monstruo normal',
  'Effect Monster': 'Monstruo de efecto',
  'Fusion Monster': 'Monstruo de fusión',
  'Ritual Monster': 'Monstruo ritual',
  'Ritual Effect Monster': 'Monstruo ritual de efecto',
  'Synchro Monster': 'Monstruo de sincronía',
  'XYZ Monster': 'Monstruo Xyz',
  'Link Monster': 'Monstruo de enlace',
  'Pendulum Effect Monster': 'Monstruo péndulo de efecto',
  'Pendulum Normal Monster': 'Monstruo péndulo normal',
  'Tuner Monster': 'Monstruo cantante',
  'Spell Card': 'Carta mágica',
  'Trap Card': 'Carta de trampa',
  'Token': 'Ficha',
};

const attributeTranslations: Record<string, string> = {
  DARK: 'OSCURIDAD', LIGHT: 'LUZ', EARTH: 'TIERRA', WATER: 'AGUA', FIRE: 'FUEGO',
  WIND: 'VIENTO', DIVINE: 'DIVINIDAD',
};

const raceTranslations: Record<string, string> = {
  Dragon: 'Dragón', Spellcaster: 'Lanzador de Conjuros', Warrior: 'Guerrero', Fairy: 'Hada',
  Fiend: 'Demonio', Machine: 'Máquina', Zombie: 'Zombi', Beast: 'Bestia',
  'Beast-Warrior': 'Guerrero-Bestia', 'Winged Beast': 'Bestia Alada', Rock: 'Roca',
  'Sea Serpent': 'Serpiente Marina', Dinosaur: 'Dinosaurio', Insect: 'Insecto',
  Thunder: 'Trueno', Psychic: 'Psíquico', Cyberse: 'Ciberso', Fish: 'Pez',
  Reptile: 'Reptil', Plant: 'Planta', Pyro: 'Piro', 'Divine-Beast': 'Bestia Divina',
  Field: 'Campo', Equip: 'Equipo', Continuous: 'Continua', 'Quick-Play': 'Juego Rápido',
  Counter: 'Contraefecto', Normal: 'Normal', Ritual: 'Ritual', Aqua: 'Aqua', Wyrm: 'Wyrm',
};

export function translateCardType(type: string): string {
  return typeTranslations[type] ?? type;
}

export function translateAttribute(attribute: string): string {
  return attributeTranslations[attribute] ?? attribute;
}

export function translateRace(race: string): string {
  return raceTranslations[race] ?? race;
}

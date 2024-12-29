export interface PokemonStatistics {
  name: string,
  base_stat: number | null,
}


export interface PokemonAbout extends PokemonStatistics {
  details: string
}

interface StatsDetail {
  name: string
}

export interface Stats {
  base_stat: number,
  stat: StatsDetail
}

export default PokemonStatistics;
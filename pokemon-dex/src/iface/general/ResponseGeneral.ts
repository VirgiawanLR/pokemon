interface UrlPokemon {
  name: string,
  url: string
}

export default interface ResponseGeneral {
  count: number,
  next: string,
  previous: string, 
  results: UrlPokemon[]
}
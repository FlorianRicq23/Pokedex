import styled from 'styled-components'
import { useQuery } from 'react-query'

function reset(setActiveTypes, pokemonsList, setFoundPokemons, types) {
  for (const key in types) {
    if (document.getElementById(types[key].english).checked) {
      document.getElementById(types[key].english).checked = false
    }
  }
  setActiveTypes('')
  setFoundPokemons(pokemonsList)
}

export function checkCheckbox(
  setActiveTypes,
  types,
  setFoundPokemons,
  pokemonsList
) {
  const list = []
  for (const key in types) {
    if (document.getElementById(types[key].english).checked) {
      list.push(document.getElementById(types[key].english).value)
    }
  }
  setActiveTypes(list)

  if (list.length === 0) {
    setFoundPokemons(pokemonsList)
  } else {
    const results = pokemonsList.filter((pokemon) => {
      for (const key in list) {
        if (!pokemon.type.includes(list[key])) {
          return null
        }
      }
      return pokemon
    })
    setFoundPokemons(results)
  }
}

const CheckboxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 15px;
  align-items: space-between;
  justify-items: center;
`

function TypesFilter({
  setActiveTypes,
  activeTypes,
  setFoundPokemons,
  pokemonsList,
}) {
  const { data, isLoading, error } = useQuery('types', async () => {
    const response = await fetch('https://api.pikaserve.xyz/types/all')
    const data = await response.json()
    return data
  })
  if (error) {
    return <span>Il y a un problème</span>
  }
  return (
    <div>
      {isLoading ? (
        <p>ça charge</p>
      ) : (
        <CheckboxContainer>
          {data.map((type) => (
            <div key={type.english}>
              {activeTypes.includes(type.english) ? (
                <input
                  classe="typesClass"
                  type="checkbox"
                  id={type.english}
                  name="types"
                  value={type.english}
                  defaultChecked
                />
              ) : (
                <input
                  classe="typesClass"
                  type="checkbox"
                  id={type.english}
                  name="types"
                  value={type.english}
                />
              )}

              <label>{type.english}</label>
            </div>
          ))}
          <button
            onClick={() =>
              checkCheckbox(
                setActiveTypes,
                data,
                setFoundPokemons,
                pokemonsList
              )
            }
          >
            Valider
          </button>
          <button
            onClick={() =>
              reset(setActiveTypes, pokemonsList, setFoundPokemons, data)
            }
          >
            Réinitialiser
          </button>
        </CheckboxContainer>
      )}
    </div>
  )
}

export default TypesFilter

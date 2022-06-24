import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { Loader } from '../../utils/style/Atoms'
import { useQuery } from 'react-query'
import Type from '../../components/Type'
import CardEvolution from '../../components/CardEvolution'
import colors from '../../utils/style/colors'
import Fleche from '../../assets/fleche.png'
import { useState } from 'react'
import PaginationPokemon from '../../components/PaginationPokemon'
import TypeEffective from '../../components/TypeEffective'
import TypeHP from '../../components/TypeHP'

const PokemonWrapper2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 0 90px;
  background-color: #f9f9fc;
  margin-bottom: 50px;
`

const PokemonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
  align-items: space-between;
  justify-items: left;
`

const PokemonContainer = styled.div`
  padding: 20px;
  margin: 0 90px;
  background-color: #f9f9fc;
  margin-bottom: 50px;
  border-radius: 10px;
`

const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100px;
`
const Name = styled.h1`
  font-size: 32px;
  margin: 0;
  font-weight: 500;
`
const Id = styled.span`
  margin-left: 15px;
  color: #8186a0;
  font-size: 32px;
`

const Picture = styled.img`
  height: 90%;
  width: 90%;
  max-width:500px;
  margin-left:auto;
  margin-right:auto;
`

const PokemonDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: #2f2e41;
`

const Description = styled.h2`
  padding-top: 10px;
  font-size: 20px;
  margin: 0;
  font-weight: 500;
  margin-bottom: 20px;
`

const Caracteristiques = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
  align-items: space-between;
  justify-items: left;
  background-color: #30a7d7;
  border-radius: 10px;
  padding: 20px;
  padding-top: 0;
  height: 220px;
`

const CaracteristiquesMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  background-color: #313131;
  color: white;
  border-radius: 10px;
  padding: 20px;
  padding-top: 0;
  height: 220px;
`
const CloseMenu = styled.span`
  align-self: flex-end;
  margin: 10px;
`

const CaracteristiquesTitle = styled.h3`
  color: white;
`

const TypeWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const Availability = styled.span`
  &:before {
    position: absolute;
    left: 0;
    top: 4px;
    height: 10px;
    width: 10px;
    border-radius: 5px;
    background-color: ${({ available }) => (available ? 'green' : 'red')};
    content: '';
  }
  padding-left: 20px;
  position: relative;
`

const EvolutionWrapper = styled.div`
  padding: 10px;
  margin: 0 90px;
  background-color:  ${({ theme }) => (theme === 'light' ? colors.backgroundThemeClair : colors.backgroundThemeSombre)};
  color:  ${({ theme }) => (theme === 'light' ? colors.policeThemeClair : colors.policeThemeSombre)};
  margin-bottom: 20px;
  border-radius: 10px;
`

const EvolutionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  grid-gap: 15px;
  align-items: space-between;
  justify-items: center;
`

const EvolutionFlecheContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const EvolutionTitle = styled.h2`
  color: white;
  text-align: center;
`

const ImgEvolution = styled.img`
  height: 90px;
  align-self: center;
`
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const TypeInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`


const TypeEffectWrapper = styled.div`
  display: column;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

function Pokemon() {
  const { id: queryId } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const [information, setInformation] = useState('')

  const { data, isLoading, error } = useQuery(
    // on utilise un tableau pour identifier la requête
    // on inclut l'Id du freelance dans ce tableau
    ['pokemon', queryId],
    async () => {
      const response = await fetch(
        `https://api.pikaserve.xyz/pokemon/${queryId}`
      )
      const data = await response.json()
      return data
    }
  )

  /*useEffect(() => {
		document.title = `${data.name.french} !`
	})*/

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  return (
    <div>
      {isLoading ? (
        <LoaderWrapper>
          <Loader data-testid="loader" />
        </LoaderWrapper>
      ) : (
        <div>
          <PokemonContainer>
            <PaginationPokemon key={`${data.id}`} id={data.id} />
            <NameWrapper>
              <Name>{data.name.french}</Name>
              <Id>#{data.id}</Id>
            </NameWrapper>
            <PokemonWrapper>
              <Picture
                src={data.image.hires}
                alt={data.name.french}
              />
              <PokemonDetails>
                <Description>{data.description}</Description>
                {data.id<=809 ? <TypeHP HPValue={data.base.HP} /> : null }
                
                <TypeWrapper>
                  {data.type.map((type, index) => (
                    <TypeInfoWrapper key={`${type}`}>
                      <Type type={type} />
                      <p
                        onClick={() => (setIsOpen(true), setInformation(type))}
                      >
                        ℹ️{' '}
                      </p>
                    </TypeInfoWrapper>
                  ))}
                </TypeWrapper>
                {isOpen ? (
                  <CaracteristiquesMenu>
                    <CloseMenu onClick={() => setIsOpen(false)}>
                      Fermer
                    </CloseMenu>
                    <div>
                      <CaracteristiquesTitle>
                        <Type key={`${information}`} type={information} />
                      </CaracteristiquesTitle>
                      <TypeEffectWrapper>
                        <TypeEffective type={information} />
                      </TypeEffectWrapper>
                    </div>
                  </CaracteristiquesMenu>
                ) : (
                  <Caracteristiques>
                    <div>
                      <CaracteristiquesTitle>Taille</CaracteristiquesTitle>
                      <span>{data.profile.height}</span>
                    </div>
                    <div>
                      <CaracteristiquesTitle>Catégorie</CaracteristiquesTitle>
                      <span>{data.species}</span>
                    </div>
                    <div>
                      <CaracteristiquesTitle>Poids</CaracteristiquesTitle>
                      <span>{data.profile.weight}</span>
                    </div>
                    <div>
                      <CaracteristiquesTitle>Talent</CaracteristiquesTitle>
                      {data.profile.ability.map((ability, index) => (
                        <p key={`ability-${ability[0]}`}>{ability[0]}</p>
                      ))}
                    </div>
                  </Caracteristiques>
                )}
              </PokemonDetails>
            </PokemonWrapper>
          </PokemonContainer>
          <EvolutionWrapper>
            <EvolutionTitle>Évolutions</EvolutionTitle>
            <EvolutionContainer>
              {data.evolution.prev && (
                <EvolutionFlecheContainer>
                  <CardEvolution
                    key={data.evolution.prev[0]}
                    id={data.evolution.prev[0]}
                  />
                  <ImgEvolution src={Fleche} alt="" />
                </EvolutionFlecheContainer>
              )}
              <CardEvolution
                key={data.id}
                id={data.id.toString()}
              />
              {data.evolution.next && (
                <EvolutionFlecheContainer>
                  <ImgEvolution src={Fleche} alt="" />
                  <CardEvolution
                    key={data.evolution.next[0][0]}
                    id={data.evolution.next[0][0]}
                  />
                </EvolutionFlecheContainer>
              )}
            </EvolutionContainer>
          </EvolutionWrapper>
        </div>
      )}
    </div>
  )
}

export default Pokemon

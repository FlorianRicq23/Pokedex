import colors from '../../utils/style/colors'
import styled from 'styled-components'

const CardType = styled.div`
  color: #F9F9FC;
  font-size: 14px;
  padding:3px;
  width:90px;
  text-align:center;
  border-radius: 30px;
`


function Type({ type }) {
	return (
		<CardType key={`${type}`}
                style={{backgroundColor: 
                    type === 'Grass' ? '#78C850' : 
                    type === 'Fire' ? '#F08030' :  
                    type === 'Water' ? '#6890F0' :
                    type === 'Bug' ? '#A8B820' :
                    type === 'Normal' ? '#A8A878' :
                    type === 'Poison' ? '#A040A0' :
                    type === 'Electric' ? '#F8D030' :
                    type === 'Ground' ? '#E0C068' :
                    type === 'Fairy' ? '#EE99AC' :
                    type === 'Fighting' ? '#C03028' :
                    type === 'Psychic' ? '#F85888' :
                    type === 'Rock' ? '#B8A038' :
                    type === 'Ghost' ? '#705898' :
                    type === 'Ice' ? '#98D8D8' :
                    type === 'Dragon' ? '#7038F8' :
                    type === 'Flying' ? '#A98FF3' :
                    type === 'Steel' ? '#B7B7CE' :
                    type === 'Dark' ? '#705746' 
                    : 'black' }}
                >
                    {type}
                </CardType>
	)
}

export default Type

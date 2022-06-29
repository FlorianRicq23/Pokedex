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
                    type === 'grass' ? '#78C850' : 
                    type === 'fire' ? '#F08030' :  
                    type === 'water' ? '#6890F0' :
                    type === 'bug' ? '#A8B820' :
                    type === 'normal' ? '#A8A878' :
                    type === 'poison' ? '#A040A0' :
                    type === 'electric' ? '#F8D030' :
                    type === 'ground' ? '#E0C068' :
                    type === 'fairy' ? '#EE99AC' :
                    type === 'fighting' ? '#C03028' :
                    type === 'psychic' ? '#F85888' :
                    type === 'rock' ? '#B8A038' :
                    type === 'ghost' ? '#705898' :
                    type === 'ice' ? '#98D8D8' :
                    type === 'dragon' ? '#7038F8' :
                    type === 'flying' ? '#A98FF3' :
                    type === 'steel' ? '#B7B7CE' :
                    type === 'dark' ? '#705746' 
                    : 'black' }}
                >
                    {type}
                </CardType>
	)
}

export default Type

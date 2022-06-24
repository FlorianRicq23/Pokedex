import Sun from '../../assets/sun.svg'
import Water from '../../assets/water.svg'

const HPLabel = {
	1: 'Faible',
	2: 'Normal',
	3: 'Resistant'
}

function TypeHP({ HPValue }) {
	const range = [0, 50, 80]

	return (
		<div onClick={() => alert(`Ce pokemon est ${ HPValue >= 80 ? HPLabel[3] : HPValue >= 40 ? HPLabel[2] : HPLabel[1] }`)}>
			{range.map((rangeElem) =>
				HPValue >= rangeElem ? (
					<span key={rangeElem.toString()}><img src={Sun} alt='sun-icon' /></span>
				) : <span key={rangeElem.toString()}><img src={Water} alt='water-icon' /></span>
			)}
		</div>
	)
}
export default TypeHP


function Logo () {

    return ( 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" className="LogoSvg">
            <circle className="Circle" cx="100" cy="50" fill="none" stroke="#111" strokeWidth="7">
                <animate attributeName="r" id="a0" begin="0.5s" dur="0.5s" from="0" to="40" fill="freeze"/>
            </circle>
            <polyline className='Line' fill="none" stroke="#111" strokeWidth="7">
                <animate attributeName="points" id="a1" begin="a0.end" dur="0.5s" fill="freeze" from="40,87 45,87" to="40,87 75,37"/>
                <animate attributeName="points" id="a2" begin="a1.end" dur="0.5s" fill="freeze" from="40,87 75,37 75,37" to="40,87 75,37 125,62"/>
                <animate attributeName="points" id="a3" begin="a2.end" dur="0.5s" fill="freeze" from="40,87 75,37 125,62 125,62" to="40,87 75,37 125,62 165,12"/>
            </polyline>
            <polyline className='Line' fill="none" stroke="#111" strokeWidth="7">
                <animate attributeName="points" id="a4" begin="a3.end" dur="0.5s" from="150,12 150,12" to="150,12 165,12"/>
            </polyline>
            <polyline className='Line' fill="none" stroke="#111" strokeWidth="7">
                <animate attributeName="points" id="a5" begin="a3.end" dur="0.5s" from="165,27 165,27" to="165,12 165,27"/>
            </polyline>
            <polyline className='Line' fill="none" stroke="#111" strokeWidth="7">
                <animate attributeName="points" id="a5" begin="a5.end" dur="0.5s" fill="freeze" from="150,12 165,12 165,27" to="150,12 165,12 165,27"/>
            </polyline>
        </svg>
    )
}

export default Logo
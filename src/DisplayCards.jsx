export default function DisplayCards(props) {

    const imageStyles = {
        maxWidth: '300px' 
    }

    const allVillagers = props.villagers.map((v, i) => {
        return (
            <li key={`villager${i}`}>
                <img 
                    style={imageStyles}
                    src={v.image_uri} 
                    alt={v.name['name-USen']} 
                    onClick={() => props.handleClick(v)}
                    />
                <p>{v.name['name-USen']}</p>
            </li>
        )
    })

    return (
        <ul>{allVillagers}</ul>
    ) 
}
export default function DisplayCards(props) {
    const allVillagers = props.villagers.map((villager, i) => {
        return(
            <li
                key={"villager-" + i}
                style={{
                    listStyleType:"none",
                    border:"3px black solid",
                    margin: "5px",
                    width: "max-content"
                }}
                onClick={() => props.handleClick(villager)}
            >
                <img 
                    src={villager.image_uri} 
                    alt={"picture of " + villager.name["name-USen"]}
                    style={{
                        maxWidth:"250px"

                    }}
                />
                <p>{villager.name["name-USen"]}</p>
            </li>
        )
    })
    return(
        <>
            <ul
                style={{
                    width: "300px",
                    backgroundColor: props.color,
                    textAlign: "center"
                }}
            >
                <h2>{props.title}</h2>
                {allVillagers}
            </ul>
        </>
    )
}
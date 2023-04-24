import Card from "./Card"

export default function DisplayCards(props) {
    const allVillagers = props.villagers.map((villager, i) => {
        return <Card 
            villager={villager}
            key={props.title + i}
            handleClick={props.handleClick}

        />
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
import Card from "./Card"

export default function DisplayCards(props) {
    const allVillagers = props.villagers.map((villager, i) => {
        return <Card
            villager={villager}
            key={props.title + i}
            handleClick={props.handleClick}
        />
    })
    return (
        <>
            <ul
                style={{
                    backgroundColor: props.color,
                }}
            >
                <h2>{props.title}</h2>
                {allVillagers}
            </ul>
        </>
    )
}
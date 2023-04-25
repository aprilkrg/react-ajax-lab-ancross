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
                <h2 className={props.handleClear ? "flex" : null}>
                    {props.title}
                    {props.handleClear ? <button className={"clear"} onClick={props.handleClear}>Clear</button> : null}
                </h2>
                {allVillagers}
            </ul>
        </>
    )
}
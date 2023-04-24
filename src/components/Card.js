export default function Card(props) {
    return (
        <>
            <li
                onClick={() => props.handleClick(props.villager)}
            >
                <img
                    src={props.villager.image_uri}
                    alt={"picture of " + props.villager.name["name-USen"]}
                />
                <p>{props.villager.name["name-USen"]}</p>
                <span>"{props.villager["catch-phrase"]}"</span>
            </li>
        </>
    )
}
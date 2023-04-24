export default function Card(props) {
    return (
        <>
            <li
                style={{
                    listStyleType: "none",
                    border: "3px black solid",
                    margin: "5px",
                    width: "max-content"
                }}
                onClick={() => props.handleClick(props.villager)}
            >
                <img
                    src={props.villager.image_uri}
                    alt={"picture of " + props.villager.name["name-USen"]}
                    style={{
                        maxWidth: "250px"

                    }}
                />
                <p>{props.villager.name["name-USen"]}</p>
            </li>
        </>
    )
}
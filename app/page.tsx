"use client"
import React, {JSX, useEffect, useState} from "react";
import anime from "animejs";

const repo = "https://api.github.com/repos/ZeusWPI/esoterische_introavond/contents/2023/1"
const token = "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"

type Player = {
    name: string,
    level: number,
    image: JSX.Element
}

export default function Home() {
    const [totalHeight, setTotalHeight] = useState(0);
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        setTotalHeight(window.innerHeight);

        const fetchPlayers = async () => {
            const fetchedPLayers: Player[] = [];
            const response = await fetch(repo, {
                headers: {
                    "Accept": "application/vnd.github.v3+json",
                    "Authorization": "token " + token
                }
            });

            const files = await response.json();
            let index = 0;
            const gap = totalHeight / 79;

            for (const file of files) {
                const username = file.name.split(".")[0];
                await fetch("https://api.github.com/users/" + username, {
                    headers: {
                        "Accept": "application/vnd.github.v3+json",
                        "Authorization": "token " + token
                    }
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    fetchedPLayers.push({
                        name: data.avatar_url, level: 1, image:
                            <div style={{
                                position: "absolute",
                                left: 125 + gap + index * gap * 5 + index * gap,
                                top: gap,
                                backgroundImage: `url(${data.avatar_url})`,
                                backgroundSize: "cover",
                                width: gap * 5,
                                height: gap * 5
                        }}></div>
                    });
                    index++;
                })
            }

            setPlayers(fetchedPLayers);
        }

        fetchPlayers().catch((error) => {
            console.error(error)
        });
    }, [totalHeight])

    update_page(players, setPlayers);

    return (
        <div>
            {players.map((player) => player.image)}
            {create_positions(totalHeight)}
        </div>
    )
}

async function update_page(players: Player[], setPlayers: (value: (((prevState: Player[]) => Player[]) | Player[])) => void) {
    while (true) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const updatedPlayers = players.map(player => {
            const newImage = React.cloneElement(player.image, {
                style: {
                    ...player.image.props.style,
                    top: player.image.props.style.top + 50
                }
            });
            return { ...player, image: newImage };
        });
        setPlayers(updatedPlayers);
    }
}

function create_positions(TotalHeight: number) {
    const positions = [];
    const gap = TotalHeight / 79;
    let index = 1;
    let x = gap;

    positions.push(<div style={{
        position: "absolute",
        left: 25,
        top: gap,
        width: gap,
        height: 50,
        backgroundColor: "white"
    }}></div>);
    while (x < TotalHeight - 1) {
        positions.push(
            <div style={{
                position: "absolute",
                left: 25,
                top: x,
                width: 100,
                height: gap * 5,
                backgroundColor: "#f77f00",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                Level {index}
            </div>
        );
        x += 5 * gap;
        positions.push(<div style={{
            position: "absolute",
            left: 25,
            top: x,
            width: 100,
            height: gap,
            backgroundColor: "#3b3b3b"
        }}></div>);
        x += gap;
        index += 1;

    }

    return positions;
}
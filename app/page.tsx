"use client"
import React, {useEffect, useState} from "react";

const repo = "https://api.github.com/repos/ZeusWPI/esoterische_introavond/contents/2024/"
const token = ""

type Player = {
    name: string,
    level: number,
    index: number,
    totalHeight: number
}

export default function Home() {
    const [totalHeight, setTotalHeight] = useState(0);
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        setTotalHeight(window.innerHeight);

        const fetchPlayers = async () => {
            const fetchedPlayers: Player[] = [];
            let index = 0;
            const playersFound = new Set<string>();

            for (let i = 13; i > 0; i--) {
                const repo_level = repo + i;
                const response = await fetch(repo_level, {
                    headers: {
                        "Accept": "application/vnd.github.v3+json",
                        "Authorization": "token " + token
                    }
                });

                if (response.status === 404) {
                    continue;
                }

                const files = await response.json();

                const playerPromises = files.map(async (file: { name: string; }) => {
                    const username = file.name.split(".")[0];
                    const userResponse = await fetch("https://api.github.com/users/" + username, {
                        headers: {
                            "Accept": "application/vnd.github.v3+json",
                            "Authorization": "token " + token
                        }
                    });

                    if (userResponse.status === 404) {
                        return null;
                    }

                    const data = await userResponse.json();
                    if (data && !playersFound.has(data.avatar_url)) {
                        fetchedPlayers.push({
                            name: data.avatar_url,
                            level: i,
                            index: index,
                            totalHeight: totalHeight
                        });
                        index++;
                        playersFound.add(data.avatar_url);
                    }
                });

                await Promise.all(playerPromises);
            }

            setPlayers(fetchedPlayers);
        }

        fetchPlayers().catch((error) => {
            console.error(error)
        });

        const interval = setInterval(() => {
            window.location.reload()
        }, 60000);

        return () => clearInterval(interval);
    }, [totalHeight]);


    return (
        <div>
            {players.map((player) => (
                <Player key={player.name} {...player}/>
            ))}
            {create_positions(totalHeight)}
        </div>
    )
}

function Player({name, level, index, totalHeight}: Player) {
    const gap = totalHeight / 79;
    return (
        <div style={{
            position: "absolute",
            left: 125 + gap + index * gap * 5 + index * gap,
            top: level * gap * 5 + level * gap - gap * 5,
            backgroundImage: `url(${name})`,
            backgroundSize: "cover",
            width: gap * 5,
            height: gap * 5
        }}></div>
)
    ;
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
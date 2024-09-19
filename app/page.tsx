"use client"
import {JSX, useEffect, useState} from "react";

const repo = "https://api.github.com/repos/ZeusWPI/esoterische_introavond/contents/2023/"

export default function Home() {
    const [totalWidth, setTotalWidth] = useState(0);
    const [totalHeight, setTotalHeight] = useState(0);
    const [players, setPlayers] = useState([""]);

    useEffect(() => {
        setTotalWidth(window.innerWidth);
        setTotalHeight(window.innerHeight);

        const fetchPlayers = async () => {
            const fetchedPLayers: string[] = []
            const response = await fetch("https://avatars.githubusercontent.com/u/77899156?v=4");
            const blob = await response.blob();
            const imageObjectURL = URL.createObjectURL(blob);
            for (let i=0; i<30; i++) {
                fetchedPLayers.push(imageObjectURL);
            }
            setPlayers(fetchedPLayers);
        }

        fetchPlayers().catch((error) => { console.error(error) });
    }, [])

    return (
        <div>
            {create_players(players, totalHeight)}
            {create_positions(totalHeight)}
        </div>)
        ;
}

function create_players(players: string[], totalHeight: number) {
    const gap = totalHeight / 79;
    const playerComponents: JSX.Element[] = [];
    let index = 0;
    players.forEach((player) => {
        playerComponents.push(
            <div style={{
                position: "absolute",
                left: 125 + gap + index * gap * 5 + index * gap,
                top: gap,
                backgroundImage: `url(${player})`,
                backgroundSize: "cover",
                width: gap * 5,
                height: gap * 5}}></div>
        );
        index++;
    });

    return playerComponents;
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
                backgroundColor: "lightblue",
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
            backgroundColor: "white"
        }}></div>);
        x += gap;
        index += 1;

    }

    return positions;
}
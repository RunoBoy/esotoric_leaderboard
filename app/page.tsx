"use client"
import {JSX, useEffect, useState} from "react";

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
            fetchedPLayers.push(imageObjectURL);
            setPlayers(fetchedPLayers);
        }

        fetchPlayers();
    }, [])

    return (
        <div>
            {create_players(players, totalWidth)}
            {create_positions(totalWidth, totalHeight)}
        </div>)
        ;
}

function create_players(players: string[], totalWidth: number) {
    const gap = totalWidth / 79;
    const playerComponents: JSX.Element[] = [];
    players.forEach((player) => {
        playerComponents.push(
            <div style={{
                position: "absolute",
                left: gap,
                backgroundImage: `url(${player})`,
                backgroundSize: "cover",
                width: gap * 5,
                height: gap * 5}}></div>
        );
    });

    return playerComponents;
}

function create_positions(TotalWidth: number, TotalHeight: number) {
    const positions = [];
    const gap = TotalWidth / 79;
    let index = 1;
    let x = gap;

    positions.push(<div style={{
        position: "absolute",
        left: 0,
        top: TotalHeight - 100,
        width: gap,
        height: 50,
        backgroundColor: "white"
    }}></div>);
    while (x < TotalWidth - 1) {
        positions.push(
            <div style={{
                position: "absolute",
                left: x,
                top: TotalHeight - 100,
                width: gap * 5,
                height: 50,
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
            left: x,
            top: TotalHeight - 100,
            width: gap,
            height: 50,
            backgroundColor: "white"
        }}></div>);
        x += gap;
        index += 1;

    }

    return positions;
}
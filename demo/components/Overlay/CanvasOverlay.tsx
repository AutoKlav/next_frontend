'use client';
import React, { useState, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Rect, Text, Group } from 'react-konva';
import useImage from 'use-image';
import { StateMachineValues } from '@/types/grpc';

type Props = {
    stateMachineValues: StateMachineValues;
};

const CanvasOverlay: React.FC<Props> = ({ stateMachineValues }) => {
    const [image] = useImage('/autoklav.png');
    const [sensorData, setSensorData] = useState<Record<string, any>>({});

    useEffect(() => {
        if (stateMachineValues?.sensorvalues) {
            setSensorData({
                // Temperature sensors
                "Temperatura": `${stateMachineValues.sensorvalues.temp.toFixed(1)}°C`,
                //"Ekspanzijska temp": `${stateMachineValues.sensorvalues.expansiontemp.toFixed(1)}°C`,
                //"Grijač temp": `${stateMachineValues.sensorvalues.heatertemp.toFixed(1)}°C`,
                "Spremnik temp": `${stateMachineValues.sensorvalues.tanktemp.toFixed(1)}°C`,
                "Temp K": `${stateMachineValues.sensorvalues.tempk.toFixed(1)}K`,

                // Pressure sensors
                "Tlak": `${stateMachineValues.sensorvalues.pressure.toFixed(1)} bar`,
                "Tlak pare": `${stateMachineValues.sensorvalues.steampressure.toFixed(1)} bar`,

                // Level sensor
                "Razina vode": `${stateMachineValues.sensorvalues.tankwaterlevel.toFixed(1)}%`,

                // Digital inputs
                "Status vrata": stateMachineValues.sensorvalues.doorClosed ? "Zatvorena" : "Otvorena",
                "Status plamenika": stateMachineValues.sensorvalues.burnerFault ? "Greška" : "OK",
                "Status vode": stateMachineValues.sensorvalues.waterShortage ? "Niska" : "OK"
            });
        }
    }, [stateMachineValues]);

    // Positions for each sensor display
    const sensorPositions = [
        // Left column (temperatures)
        { name: "Temperatura", x: 50, y: 50 },
        //{ name: "Ekspanzijska temp", x: 50, y: 80 },
        //{ name: "Grijač temp", x: 50, y: 110 },
        { name: "Spremnik temp", x: 50, y: 140 },
        { name: "Temperatura sredine", x: 50, y: 170 },

        // Middle column (pressures and level)
        { name: "Tlak", x: 250, y: 50 },
        { name: "Tlak pare", x: 250, y: 80 },
        { name: "Razina vode", x: 250, y: 110 },

        // Right column (status indicators)
        { name: "Status vrata", x: 450, y: 50 },
        { name: "Status plamenika", x: 450, y: 80 },
        { name: "Status vode", x: 450, y: 110 }
    ];

    const getStatusColor = (value: string) => {
        if (value === "Greška" || value === "Niska" || value === "Otvorena") return "#ff0000";
        if (value === "OK" || value === "Zatvorena") return "#00aa00";
        return "#333333";
    };

    return (
        <div style={{ position: 'relative' }}>
            <Stage width={600} height={380}>
                <Layer>
                    {image && <KonvaImage image={image} x={0} y={0} width={600} height={380} cornerRadius={10} />}

                    {/* Display all sensor values */}
                    {sensorPositions.map((pos) => (
                        <Group key={pos.name}>
                            <Text
                                x={pos.x}
                                y={pos.y}
                                text={`${pos.name}:`}
                                fontSize={14}
                                fill="#333"
                                fontStyle="bold"
                            />
                            <Text
                                x={pos.x + 150}
                                y={pos.y}
                                text={sensorData[pos.name] || "--"}
                                fontSize={14}
                                fill={getStatusColor(sensorData[pos.name])}
                            />
                        </Group>
                    ))}

                    {/* Display any active warnings at the bottom */}
                    {(stateMachineValues?.sensorvalues?.burnerFault ||
                        stateMachineValues?.sensorvalues?.waterShortage ||
                        !stateMachineValues?.sensorvalues?.doorClosed) && (
                            <Group>
                                <Rect
                                    x={50}
                                    y={300}
                                    width={500}
                                    height={50}
                                    fill="rgba(255, 200, 200, 0.7)"
                                    stroke="#ff0000"
                                    strokeWidth={2}
                                    cornerRadius={5}
                                />
                                <Text
                                    x={60}
                                    y={315}
                                    text="UPOZORENJA:"
                                    fontSize={16}
                                    fill="#ff0000"
                                    fontStyle="bold"
                                />
                                <Text
                                    x={150}
                                    y={315}
                                    text={[
                                        !stateMachineValues?.sensorvalues?.doorClosed ? "VRATA OTVORENA" : "",
                                        stateMachineValues?.sensorvalues?.burnerFault ? "GREŠKA PLAMENIKA" : "",
                                        stateMachineValues?.sensorvalues?.waterShortage ? "NISKA RAZINA VODE" : ""
                                    ].filter(Boolean).join(" | ")}
                                    fontSize={16}
                                    fill="#ff0000"
                                />
                            </Group>
                        )}
                </Layer>
            </Stage>
        </div>
    );
};

export default CanvasOverlay;
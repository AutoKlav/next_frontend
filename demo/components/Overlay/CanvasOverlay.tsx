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
                "Temperature": `${stateMachineValues.sensorvalues.temp.toFixed(1)}°C`,
                "Expansion Temp": `${stateMachineValues.sensorvalues.expansiontemp.toFixed(1)}°C`,
                "Heater Temp": `${stateMachineValues.sensorvalues.heatertemp.toFixed(1)}°C`,
                "Tank Temp": `${stateMachineValues.sensorvalues.tanktemp.toFixed(1)}°C`,
                "Temp K": `${stateMachineValues.sensorvalues.tempk.toFixed(1)}K`,

                // Pressure sensors
                "Pressure": `${stateMachineValues.sensorvalues.pressure.toFixed(1)} bar`,
                "Steam Pressure": `${stateMachineValues.sensorvalues.steampressure.toFixed(1)} bar`,

                // Level sensor
                "Water Level": `${stateMachineValues.sensorvalues.tankwaterlevel.toFixed(1)}%`,

                // Digital inputs
                "Door Status": stateMachineValues.sensorvalues.doorClosed ? "Closed" : "Open",
                "Burner Status": stateMachineValues.sensorvalues.burnerFault ? "Fault" : "OK",
                "Water Status": stateMachineValues.sensorvalues.waterShortage ? "Low" : "OK"
            });
        }
    }, [stateMachineValues]);

    // Positions for each sensor display
    const sensorPositions = [
        // Left column (temperatures)
        { name: "Temperature", x: 50, y: 50 },
        { name: "Expansion Temp", x: 50, y: 80 },
        { name: "Heater Temp", x: 50, y: 110 },
        { name: "Tank Temp", x: 50, y: 140 },
        { name: "Temp K", x: 50, y: 170 },

        // Middle column (pressures and level)
        { name: "Pressure", x: 250, y: 50 },
        { name: "Steam Pressure", x: 250, y: 80 },
        { name: "Water Level", x: 250, y: 110 },

        // Right column (status indicators)
        { name: "Door Status", x: 450, y: 50 },
        { name: "Burner Status", x: 450, y: 80 },
        { name: "Water Status", x: 450, y: 110 }
    ];

    const getStatusColor = (value: string) => {
        if (value === "Fault" || value === "Low" || value === "Open") return "#ff0000";
        if (value === "OK" || value === "Closed") return "#00aa00";
        return "#333333";
    };

    return (
        <div style={{ position: 'relative' }}>
            <Stage width={600} height={380}>
                <Layer>
                    {image && <KonvaImage image={image} x={0} y={0} width={600} height={380} />}

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
                                    text="WARNINGS:"
                                    fontSize={16}
                                    fill="#ff0000"
                                    fontStyle="bold"
                                />
                                <Text
                                    x={150}
                                    y={315}
                                    text={[
                                        !stateMachineValues?.sensorvalues?.doorClosed ? "DOOR OPEN" : "",
                                        stateMachineValues?.sensorvalues?.burnerFault ? "BURNER FAULT" : "",
                                        stateMachineValues?.sensorvalues?.waterShortage ? "WATER LOW" : ""
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
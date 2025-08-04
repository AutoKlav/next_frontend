'use client';
import React, { useState, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Rect, Text, Group } from 'react-konva';
import useImage from 'use-image';
import { StateMachineValues } from '@/types/grpc';
import { TEMP_AK, TEMP_SPREM, TEMP_SRED, TLAK_AK } from '@/constants';

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
                [TEMP_AK]: `${stateMachineValues.sensorvalues.temp.toFixed(2)}°C`,
                [TEMP_SPREM]: `${stateMachineValues.sensorvalues.tanktemp.toFixed(2)}°C`,
                [TEMP_SRED]: `${stateMachineValues.sensorvalues.tempk.toFixed(2)}°C`,

                // Pressure sensors
                [TLAK_AK]: `${stateMachineValues.sensorvalues.pressure.toFixed(2)} bar`,
            });
        }
    }, [stateMachineValues]);

    // Positions for each sensor display
    const sensorPositions = [
        { name: TEMP_AK, x: 30, y: 20 },
        { name: TEMP_SRED, x: 30, y: 45 },
        { name: TEMP_SPREM, x: 30, y: 65 },
        { name: TLAK_AK, x: 250, y: 20 },
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
                        stateMachineValues?.sensorvalues?.doorClosed) ? (
                        <Group>
                            <Rect
                                x={50}
                                y={320}
                                width={500}
                                height={50}
                                fill="rgba(255, 200, 200, 0.7)"
                                stroke="#ff0000"
                                strokeWidth={2}
                                cornerRadius={5}
                            />
                            <Text
                                x={60}
                                y={335}
                                text="UPOZORENJA: "
                                fontSize={16}
                                fill="#ff0000"
                                fontStyle="bold"
                            />
                            <Text
                                x={180}
                                y={335}
                                text={[
                                    stateMachineValues?.sensorvalues?.doorClosed ? "VRATA OTVORENA" : "",
                                    stateMachineValues?.sensorvalues?.burnerFault ? "GREŠKA PLAMENIKA" : "",
                                    stateMachineValues?.sensorvalues?.waterShortage ? "NISKA RAZINA VODE" : ""
                                ].filter(Boolean).join(" | ")}
                                fontSize={16}
                                fill="#ff0000"
                            />
                        </Group>
                    ) :
                        <Group>
                            <Rect
                                x={50}
                                y={320}
                                width={500}
                                height={50}
                                fill="rgba(255, 200, 200, 0.7)"
                                stroke="#ff0000"
                                strokeWidth={2}
                                cornerRadius={5}
                            />
                            <Text
                                x={60}
                                y={335}
                                text="STATUS: "
                                fontSize={16}
                                fill="#ff0000"
                                fontStyle="bold"
                            />
                            <Text
                                x={180}
                                y={335}
                                text={"OK"}
                                fontSize={16}
                                fill="#ff0000"
                            />
                        </Group>}
                </Layer>
            </Stage>
        </div>
    );
};

export default CanvasOverlay;
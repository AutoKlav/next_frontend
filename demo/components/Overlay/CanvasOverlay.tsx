'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Stage, Layer, Image as KonvaImage, Rect, Text, Group } from 'react-konva';
import useImage from 'use-image';
import { StateMachineValues } from '@/types/grpc';
import { TEMP_AK, TEMP_SPREM, TEMP_SRED, TLAK_AK } from '@/constants';

const ORIGINAL_IMAGE_WIDTH = 1280;
const ORIGINAL_IMAGE_HEIGHT = 720;
const SENSOR_LABEL_HEIGHT = 30;
const SENSOR_LABEL_SPACING = 10;

const CanvasOverlay: React.FC<{ stateMachineValues: StateMachineValues }> = ({ stateMachineValues }) => {
    const [image] = useImage('/autoklav.png');
    const [sensorData, setSensorData] = useState<Record<string, string>>({});
    const [containerSize, setContainerSize] = useState({ width: 600, height: 400 });
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    // Calculate scaled dimensions while maintaining aspect ratio
    const calculateImageSize = useCallback((containerWidth: number, containerHeight: number) => {
        const widthRatio = containerWidth / ORIGINAL_IMAGE_WIDTH;
        const heightRatio = containerHeight / ORIGINAL_IMAGE_HEIGHT;
        const scale = Math.min(widthRatio, heightRatio);

        return {
            width: ORIGINAL_IMAGE_WIDTH * scale,
            height: ORIGINAL_IMAGE_HEIGHT * scale
        };
    }, []);

    // Calculate sensor positions with fixed spacing
    const sensorPositions = useMemo(() => {
        if (imageSize.width === 0 || imageSize.height === 0) return [];

        const baseX = 20;
        const baseY = 5;

        return [
            { name: TEMP_AK, x: baseX, y: baseY },
            { name: TEMP_SRED, x: baseX, y: baseY + (SENSOR_LABEL_HEIGHT + SENSOR_LABEL_SPACING) },
            { name: TEMP_SPREM, x: baseX, y: baseY + 2 * (SENSOR_LABEL_HEIGHT + SENSOR_LABEL_SPACING) },
            { name: TLAK_AK, x: baseX, y: baseY + 3 * (SENSOR_LABEL_HEIGHT + SENSOR_LABEL_SPACING) },
        ];
    }, [imageSize]);

    useEffect(() => {
        if (stateMachineValues?.sensorvalues) {
            setSensorData({
                [TEMP_AK]: `${stateMachineValues.sensorvalues.temp.toFixed(2)}°C`,
                [TEMP_SPREM]: `${stateMachineValues.sensorvalues.tanktemp.toFixed(2)}°C`,
                [TEMP_SRED]: `${stateMachineValues.sensorvalues.tempk.toFixed(2)}°C`,
                [TLAK_AK]: `${stateMachineValues.sensorvalues.pressure.toFixed(2)} bar`,
            });
        }
    }, [stateMachineValues]);

    // Handle container resize
    useEffect(() => {
        const handleResize = () => {
            const container = document.getElementById('canvas-container');
            if (container) {
                const newContainerSize = {
                    width: container.clientWidth,
                    height: container.clientHeight
                };
                setContainerSize(newContainerSize);
                setImageSize(calculateImageSize(newContainerSize.width, newContainerSize.height));
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [calculateImageSize]);

    return (
        <div id="canvas-container" style={{ width: '100%', height: '500px', minHeight: '400px' }}>
            <Stage width={containerSize.width} height={containerSize.height}>
                <Layer>
                    {image && (
                        <KonvaImage
                            image={image}
                            x={(containerSize.width - imageSize.width) / 2}
                            y={(containerSize.height - imageSize.height) / 2}
                            width={imageSize.width}
                            height={imageSize.height}
                            cornerRadius={10}
                        />
                    )}

                    {sensorPositions.map((pos) => {
                        const valueColor = pos.name.includes("TEMP") ? "red" : "blue";

                        return (
                            <Group key={pos.name}>
                                <Rect
                                    x={pos.x}
                                    y={pos.y}
                                    width={250}
                                    height={SENSOR_LABEL_HEIGHT}
                                    fill="rgba(255, 255, 255, 0.95)"
                                    cornerRadius={5}
                                    shadowColor="rgba(0,0,0,0.2)"
                                    shadowBlur={5}
                                    shadowOffset={{ x: 2, y: 2 }}
                                    shadowOpacity={0.8}
                                />
                                <Text
                                    x={pos.x + 10}
                                    y={pos.y + 5}
                                    text={`${pos.name}:`}
                                    fontSize={14}
                                    fill="#000"
                                    fontStyle="bold"
                                />
                                <Text
                                    x={pos.x + 160}
                                    y={pos.y + 5}
                                    text={sensorData[pos.name] || "--"}
                                    fontSize={14}
                                    fill={valueColor}
                                    fontStyle="bold"
                                />
                            </Group>
                        );
                    })}

                    {imageSize.width > 0 && (
                        <Group>
                            <Rect
                                x={containerSize.width / 3}
                                y={5}
                                width={containerSize.width / 2 - 200}
                                height={40}
                                fill={
                                    stateMachineValues?.sensorvalues?.burnerFault ||
                                        stateMachineValues?.sensorvalues?.waterShortage ||
                                        stateMachineValues?.sensorvalues?.doorClosed
                                        ? "rgba(255, 200, 200, 0.7)"
                                        : "rgba(220, 255, 220, 0.8)"
                                }
                                stroke={
                                    stateMachineValues?.sensorvalues?.burnerFault ||
                                        stateMachineValues?.sensorvalues?.waterShortage ||
                                        stateMachineValues?.sensorvalues?.doorClosed
                                        ? "#ff0000"
                                        : "#2e7d32"
                                }
                                strokeWidth={1}
                                cornerRadius={5}
                            />
                            <Text
                                x={containerSize.width / 3 + 10}
                                y={20}

                                text={
                                    stateMachineValues?.sensorvalues?.burnerFault ||
                                        stateMachineValues?.sensorvalues?.waterShortage ||
                                        stateMachineValues?.sensorvalues?.doorClosed
                                        ? "UPOZORENJA: " + [
                                            stateMachineValues?.sensorvalues?.doorClosed ? "VRATA OTVORENA" : "",
                                            stateMachineValues?.sensorvalues?.burnerFault ? "GREŠKA PLAMENIKA" : "",
                                            stateMachineValues?.sensorvalues?.waterShortage ? "NISKA RAZINA VODE" : ""
                                        ].filter(Boolean).join(" | ")
                                        : "STATUS: Spremno za rad"
                                }
                                fontSize={14}
                                fill={
                                    stateMachineValues?.sensorvalues?.burnerFault ||
                                        stateMachineValues?.sensorvalues?.waterShortage ||
                                        stateMachineValues?.sensorvalues?.doorClosed
                                        ? "#ff0000"
                                        : "#1b5e20"
                                }
                                fontStyle="bold"
                                width={containerSize.width - 40}
                                wrap="word"
                            />
                        </Group>
                    )}
                </Layer>
            </Stage>
        </div>
    );
};

export default CanvasOverlay;
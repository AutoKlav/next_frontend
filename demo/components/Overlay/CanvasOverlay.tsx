'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Stage, Layer, Image as KonvaImage, Rect, Text, Group } from 'react-konva';
import useImage from 'use-image';
import { StateMachineValues } from '@/types/grpc';
import { TEMP_AK, TEMP_SPREM, TEMP_SRED, TLAK_AK } from '@/constants';

const ORIGINAL_IMAGE_WIDTH = 1280;
const ORIGINAL_IMAGE_HEIGHT = 720;

const CanvasOverlay: React.FC<{ stateMachineValues: StateMachineValues }> = ({ stateMachineValues }) => {
    const [image] = useImage('/autoklav.png');
    const [sensorData, setSensorData] = useState<Record<string, string>>({});
    const [containerSize, setContainerSize] = useState({ width: 600, height: 400 }); // Adjusted for col-6
    const [imageSize, setImageSize] = useState({ width: 600, height: 337.5 }); // Maintains 16:9 aspect ratio

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

    // Calculate positions relative to the original image dimensions
    const getRelativePosition = (x: number, y: number) => ({
        x: (x / ORIGINAL_IMAGE_WIDTH) * imageSize.width,
        y: (y / ORIGINAL_IMAGE_HEIGHT) * imageSize.height
    });

    // Adjusted sensor positions to fit within the image
    const sensorPositions = [
        { name: TEMP_AK, ...getRelativePosition(50, 50) },
        { name: TEMP_SRED, ...getRelativePosition(50, 100) },
        { name: TEMP_SPREM, ...getRelativePosition(50, 150) },
        { name: TLAK_AK, ...getRelativePosition(50, 200) },
    ];

    return (
        <div id="canvas-container" style={{ width: '100%', height: '400px' }}>
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

                    {/* Display all sensor values */}
                    {sensorPositions.map((pos) => {
                        const valueColor = pos.name.includes("TEMP") ? "red" : "blue";
                        const scaleFactor = imageSize.width / ORIGINAL_IMAGE_WIDTH;

                        return (
                            <Group key={pos.name}>
                                <Rect
                                    x={pos.x}
                                    y={pos.y}
                                    width={200 * scaleFactor}
                                    height={30 * scaleFactor}
                                    fill="rgba(255, 255, 255, 0.95)"
                                    cornerRadius={5 * scaleFactor}
                                    shadowColor="rgba(0,0,0,0.2)"
                                    shadowBlur={5 * scaleFactor}
                                    shadowOffset={{ x: 2 * scaleFactor, y: 2 * scaleFactor }}
                                    shadowOpacity={0.5}
                                />
                                <Text
                                    x={pos.x + 10 * scaleFactor}
                                    y={pos.y + 5 * scaleFactor}
                                    text={`${pos.name}:`}
                                    fontSize={14 * scaleFactor}
                                    fill="#000"
                                    fontStyle="bold"
                                />
                                <Text
                                    x={pos.x + 120 * scaleFactor}
                                    y={pos.y + 5 * scaleFactor}
                                    text={sensorData[pos.name] || "--"}
                                    fontSize={14 * scaleFactor}
                                    fill={valueColor}
                                    fontStyle="bold"
                                />
                            </Group>
                        );
                    })}

                    {/* Warning/Status bar at the bottom */}
                    <Group>
                        <Rect
                            x={10 * (imageSize.width / ORIGINAL_IMAGE_WIDTH)}
                            y={imageSize.height - 40 * (imageSize.height / ORIGINAL_IMAGE_HEIGHT)}
                            width={imageSize.width - 20 * (imageSize.width / ORIGINAL_IMAGE_WIDTH)}
                            height={30 * (imageSize.height / ORIGINAL_IMAGE_HEIGHT)}
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
                            strokeWidth={1 * (imageSize.width / ORIGINAL_IMAGE_WIDTH)}
                            cornerRadius={5 * (imageSize.width / ORIGINAL_IMAGE_WIDTH)}
                        />
                        <Text
                            x={20 * (imageSize.width / ORIGINAL_IMAGE_WIDTH)}
                            y={imageSize.height - 35 * (imageSize.height / ORIGINAL_IMAGE_HEIGHT)}
                            text={
                                stateMachineValues?.sensorvalues?.burnerFault ||
                                    stateMachineValues?.sensorvalues?.waterShortage ||
                                    stateMachineValues?.sensorvalues?.doorClosed
                                    ? "UPOZORENJA: " + [
                                        stateMachineValues?.sensorvalues?.doorClosed ? "VRATA OTVORENA" : "",
                                        stateMachineValues?.sensorvalues?.burnerFault ? "GREŠKA PLAMENIKA" : "",
                                        stateMachineValues?.sensorvalues?.waterShortage ? "NISKA RAZINA VODE" : ""
                                    ].filter(Boolean).join(" | ")
                                    : "STATUS: OK"
                            }
                            fontSize={14 * (imageSize.width / ORIGINAL_IMAGE_WIDTH)}
                            fill={
                                stateMachineValues?.sensorvalues?.burnerFault ||
                                    stateMachineValues?.sensorvalues?.waterShortage ||
                                    stateMachineValues?.sensorvalues?.doorClosed
                                    ? "#ff0000"
                                    : "#1b5e20"
                            }
                            fontStyle="bold"
                        />
                    </Group>
                </Layer>
            </Stage>
        </div>
    );
};

export default CanvasOverlay;
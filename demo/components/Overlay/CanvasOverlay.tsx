'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Stage, Layer, Image as KonvaImage, Rect, Text, Group } from 'react-konva';
import useImage from 'use-image';
import { StateMachineValues } from '@/types/grpc';
import { TEMP_AK, TEMP_SPREM, TEMP_SRED, TLAK_AK } from '@/constants';

type Props = {
    stateMachineValues: StateMachineValues;
};

const ORIGINAL_IMAGE_WIDTH = 1280; // Replace with your image's original width
const ORIGINAL_IMAGE_HEIGHT = 720; // Replace with your image's original height

const CanvasOverlay: React.FC<Props> = ({ stateMachineValues }) => {
    const [image] = useImage('/autoklav.png');
    const [sensorData, setSensorData] = useState<Record<string, string>>({});
    const [containerSize, setContainerSize] = useState({ width: 1280, height: 720 });
    const [imageSize, setImageSize] = useState({ width: 1280, height: 720 });

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

    const sensorPositions = [
        { name: TEMP_AK, ...getRelativePosition(50, 50) },
        { name: TEMP_SRED, ...getRelativePosition(50, 95) },
        { name: TEMP_SPREM, ...getRelativePosition(50, 140) },
        { name: TLAK_AK, ...getRelativePosition(50, 185) },
    ];

    return (
        <div id="canvas-container" style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <Stage width={containerSize.width} height={containerSize.height}>
                <Layer>
                    {image && (
                        <KonvaImage
                            image={image}
                            x={(containerSize.width - imageSize.width) / 2} // Center horizontally
                            y={(containerSize.height - imageSize.height) / 2} // Center vertically
                            width={imageSize.width}
                            height={imageSize.height}
                            cornerRadius={10}
                        />
                    )}

                    {/* Display all sensor values */}
                    {sensorPositions.map((pos) => (
                        <Group key={pos.name}>
                            <Text
                                x={pos.x}
                                y={pos.y}
                                text={`${pos.name} `}
                                fontSize={18 * (imageSize.width / ORIGINAL_IMAGE_WIDTH)} // Scale font size
                                fill="#333"
                                fontStyle="bold"
                            />
                            <Text
                                x={pos.x + 170 * (imageSize.width / ORIGINAL_IMAGE_WIDTH)}
                                y={pos.y}
                                text={sensorData[pos.name] || "--"}
                                fontSize={18 * (imageSize.width / ORIGINAL_IMAGE_WIDTH)}
                                fill="#333333"
                            />
                        </Group>
                    ))}

                    {/* Display any active warnings at the bottom */}
                    {(stateMachineValues?.sensorvalues?.burnerFault ||
                        stateMachineValues?.sensorvalues?.waterShortage ||
                        stateMachineValues?.sensorvalues?.doorClosed) ? (
                        <Group>
                            <Rect
                                x={containerSize.width * 0.05}
                                y={containerSize.height * 0.85}
                                width={containerSize.width * 0.9}
                                height={containerSize.height * 0.1}
                                fill="rgba(255, 200, 200, 0.7)"
                                stroke="#ff0000"
                                strokeWidth={2 * (imageSize.width / ORIGINAL_IMAGE_WIDTH)}
                                cornerRadius={5 * (imageSize.width / ORIGINAL_IMAGE_WIDTH)}
                            />
                            <Text
                                x={containerSize.width * 0.06}
                                y={containerSize.height * 0.88}
                                text="UPOZORENJA: "
                                fontSize={16 * (imageSize.width / ORIGINAL_IMAGE_WIDTH)}
                                fill="#ff0000"
                                fontStyle="bold"
                            />
                            <Text
                                x={containerSize.width * 0.2}
                                y={containerSize.height * 0.88}
                                text={[
                                    stateMachineValues?.sensorvalues?.doorClosed ? "VRATA OTVORENA" : "",
                                    stateMachineValues?.sensorvalues?.burnerFault ? "GREŠKA PLAMENIKA" : "",
                                    stateMachineValues?.sensorvalues?.waterShortage ? "NISKA RAZINA VODE" : ""
                                ].filter(Boolean).join(" | ")}
                                fontSize={16 * (imageSize.width / ORIGINAL_IMAGE_WIDTH)}
                                fill="#ff0000"
                            />
                        </Group>
                    ) : (
                        <Group>
                            <Rect
                                x={containerSize.width * 0.05}
                                y={containerSize.height * 0.85}
                                width={containerSize.width * 0.9}
                                height={containerSize.height * 0.1}
                                fill="rgba(220, 255, 220, 0.8)"
                                stroke="#2e7d32"
                                strokeWidth={2 * (imageSize.width / ORIGINAL_IMAGE_WIDTH)}
                                cornerRadius={5 * (imageSize.width / ORIGINAL_IMAGE_WIDTH)}
                            />
                            <Text
                                x={containerSize.width * 0.06}
                                y={containerSize.height * 0.88}
                                text="STATUS: "
                                fontSize={16 * (imageSize.width / ORIGINAL_IMAGE_WIDTH)}
                                fill="#1b5e20"
                                fontStyle="bold"
                            />
                            <Text
                                x={containerSize.width * 0.15}
                                y={containerSize.height * 0.88}
                                text={"OK"}
                                fontSize={16 * (imageSize.width / ORIGINAL_IMAGE_WIDTH)}
                                fill="#1b5e20"
                                fontStyle="bold"
                            />
                        </Group>
                    )}
                </Layer>
            </Stage>
        </div>
    );
};

export default CanvasOverlay;
'use client';
import React, { useState, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Rect, Text } from 'react-konva';
import useImage from 'use-image';
import { DataPoint, SensorValues, StateMachineValues } from '@/types/grpc';

type Props = {
    dataValues: StateMachineValues;
    points: DataPoint[];
};

const CanvasOverlay: React.FC<Props> = ({ points, dataValues }) => {
    const [image] = useImage('/autoklav.png');
    const [displayValues, setDisplayValues] = useState<Record<string, SensorValues>>({});

    // Update displayed values when data changes
    useEffect(() => {
        const newValues: Record<string, SensorValues> = {};
        points.forEach(point => {
            newValues[point.id] = dataValues.sensorvalues;
        });
        setDisplayValues(newValues);
    }, [dataValues, points]);

    // Helper function to generate error string
    const getErrorString = (sensor: SensorValues) => {
        const errors = [];
        if (sensor.doorClosed) errors.push('Door');
        if (sensor.burnerFault) errors.push('Burner');
        if (sensor.waterShortage) errors.push('Water');
        return errors.length > 0 ? errors.join(', ') : 'OK';
    };

    return (
        <div style={{ position: 'relative' }}>
            <Stage width={1200} height={380}>
                <Layer>
                    {image && <KonvaImage image={image} x={0} y={0} width={600} height={400} />}
                    {points.map((p) => {
                        const sensor = displayValues[p.id];
                        const hasErrors = sensor && (sensor.doorClosed || sensor.burnerFault || sensor.waterShortage);

                        return (
                            <React.Fragment key={p.id}>
                                {/* Main temperature rectangle */}
                                <Rect
                                    x={p.x - 30}
                                    y={p.y - 40}
                                    width={60}
                                    height={80}
                                    fill={hasErrors ? 'rgba(255, 200, 200, 0.8)' : 'rgba(255, 255, 255, 0.7)'}
                                    stroke={hasErrors ? '#ff0000' : '#333'}
                                    strokeWidth={hasErrors ? 2 : 1}
                                    cornerRadius={4}
                                />

                                {/* Temperature in Celsius */}
                                <Text
                                    x={p.x - 30}
                                    y={p.y - 35}
                                    width={60}
                                    height={20}
                                    text={sensor ? `${sensor.temp.toFixed(1)}°C` : '--°C'}
                                    fontSize={14}
                                    align="center"
                                    fill="#333"
                                />

                                {/* Error status */}
                                <Text
                                    x={p.x - 30}
                                    y={p.y + 5}
                                    width={60}
                                    height={20}
                                    text={sensor ? getErrorString(sensor) : '--'}
                                    fontSize={12}
                                    align="center"
                                    fill={hasErrors ? '#ff0000' : '#00aa00'}
                                    fontStyle={hasErrors ? 'bold' : 'normal'}
                                />
                            </React.Fragment>
                        );
                    })}
                </Layer>
            </Stage>
        </div>
    );
};

export default CanvasOverlay;
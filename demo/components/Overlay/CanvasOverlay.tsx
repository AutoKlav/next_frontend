'use client';
import React, { useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Circle, Text } from 'react-konva';
import useImage from 'use-image';
import { motion, AnimatePresence } from 'framer-motion';
import { DataPoint, SensorValues, StateMachineValues } from '@/types/grpc';

type Props = {
    dataValues: StateMachineValues;
    points: DataPoint[];
};

const Tooltip: React.FC<{ x: number; y: number; values: SensorValues }> = ({ x, y, values }) => {
    const variants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
    };
    return (
        <motion.div
            className="tooltip"
            style={{ position: 'absolute', top: y, left: x, background: '#333', color: '#fff', padding: 6, borderRadius: 4, pointerEvents: 'none', fontSize: 12 }}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div>Temp: {values.temp} °C</div>
            <div>DoorClosed: {values.doorClosed}</div>
            <div>BurnerFault: {values.burnerFault}</div>
            <div>WaterShortage: {values.waterShortage}</div>
        </motion.div>
    );
};

const CanvasOverlay: React.FC<Props> = ({ points, dataValues }) => {
    const [image] = useImage('/autoklav.png');
    const [hovered, setHovered] = useState<{ point: DataPoint; x: number; y: number } | null>(null);

    return (
        <div style={{ position: 'relative' }}>
            <Stage width={1200} height={380}>
                <Layer>
                    {image && <KonvaImage image={image} x={0} y={0} width={600} height={400} />}
                    {points.map((p) => (
                        <Circle
                            key={p.id}
                            x={p.x}
                            y={p.y}
                            radius={6}
                            fill="red"
                            onMouseEnter={(e) => {
                                const pos = e.target.getStage()?.getPointerPosition();
                                if (pos) setHovered({ point: p, x: pos.x + 10, y: pos.y + 10 });
                            }}
                            onMouseLeave={() => setHovered(null)}
                        />
                    ))}
                </Layer>
            </Stage>
            <AnimatePresence>
                {hovered && (
                    <Tooltip x={hovered.x} y={hovered.y} values={dataValues.sensorvalues} key={hovered.point.id} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default CanvasOverlay;

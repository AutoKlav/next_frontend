"use client"

// useTemperatureTiming.ts
import { useState, useCallback } from 'react';

interface TemperatureTiming {
  startHeatingTime: Date | null;
  targetHeatingTime: string;
  startCoolingTime: Date | null;
  targetCoolingTime: string;
  finishHeatingTime: Date | null;
  finishCoolingTime: Date | null;
  startHeating: () => void;
  startCooling: () => void;
  setTargetHeatingTime: (time: string) => void;
  setTargetCoolingTime: (time: string) => void;
  getHeatingDurationMinutes: () => number;
  getCoolingDurationMinutes: () => number;
  getRemainingHeatingTime: () => number;
  getRemainingCoolingTime: () => number;
}

/**
 * Custom hook for managing temperature timing in a process.
 * It provides functions and state variables to track the start time, target time, and finish time for heating and cooling processes.
 */
const useTemperatureTiming = (): TemperatureTiming => {
  const [startHeatingTime, setStartHeatingTime] = useState<Date | null>(null);
  const [targetHeatingTime, setTargetHeatingTime] = useState<string>('0');
  const [startCoolingTime, setStartCoolingTime] = useState<Date | null>(null);
  const [targetCoolingTime, setTargetCoolingTime] = useState<string>('0');

  // Convert time string (minutes) to number
  const parseTime = (timeString: string): number => {
    return parseFloat(timeString) || 0;
  };

  // Calculate finish time based on start time and duration
  const calculateFinishTime = (start: Date, durationMinutes: number): Date => {
    return new Date(start.getTime() + durationMinutes * 60000);
  };

  // Start heating process
  const startHeating = useCallback(() => {
    const now = new Date();
    setStartHeatingTime(now);
  }, []);

  // Start cooling process
  const startCooling = useCallback(() => {
    const now = new Date();
    setStartCoolingTime(now);
  }, []);

  // Set target heating time (string input)
  const handleSetTargetHeatingTime = useCallback((time: string) => {
    setTargetHeatingTime(time);
  }, []);

  // Set target cooling time (string input)
  const handleSetTargetCoolingTime = useCallback((time: string) => {
    setTargetCoolingTime(time);
  }, []);

  // Calculate finish heating time
  const finishHeatingTime = startHeatingTime
    ? calculateFinishTime(startHeatingTime, parseTime(targetHeatingTime))
    : null;

  // Calculate finish cooling time
  const finishCoolingTime = startCoolingTime
    ? calculateFinishTime(startCoolingTime, parseTime(targetCoolingTime))
    : null;

  // Get total heating duration in minutes
  const getHeatingDurationMinutes = useCallback(() => {
    return parseTime(targetHeatingTime) / (60*1000);
  }, [targetHeatingTime]);

  // Get total cooling duration in minutes
  const getCoolingDurationMinutes = useCallback(() => {
    return parseTime(targetCoolingTime) / (60*1000);
  }, [targetCoolingTime]);

  // Get remaining heating time in minutes
  const getRemainingHeatingTime = useCallback(() => {
    if (!startHeatingTime || !finishHeatingTime) return 0;
    const now = new Date();
    if (now >= finishHeatingTime) return 0;
    return Math.round((finishHeatingTime.getTime() - now.getTime()) / 60000);
  }, [startHeatingTime, finishHeatingTime]);

  // Get remaining cooling time in minutes
  const getRemainingCoolingTime = useCallback(() => {
    if (!startCoolingTime || !finishCoolingTime) return 0;
    const now = new Date();
    if (now >= finishCoolingTime) return 0;
    return Math.round((finishCoolingTime.getTime() - now.getTime()) / 60000);
  }, [startCoolingTime, finishCoolingTime]);

  return {
    startHeatingTime,
    targetHeatingTime,
    startCoolingTime,
    targetCoolingTime,
    finishHeatingTime,
    finishCoolingTime,
    startHeating,
    startCooling,
    setTargetHeatingTime: handleSetTargetHeatingTime,
    setTargetCoolingTime: handleSetTargetCoolingTime,
    getHeatingDurationMinutes,
    getCoolingDurationMinutes,
    getRemainingHeatingTime,
    getRemainingCoolingTime,
  };
};

export default useTemperatureTiming;
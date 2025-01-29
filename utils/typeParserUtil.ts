import { HeatingType, ProcessConfigType } from "@/types/grpc";
import { ProcessConfigMode } from "@/types/grpc";

/**
 * Retrieves the ProcessConfigType based on the provided id.
 * @param id - The id of the ProcessConfigType.
 * @returns The corresponding ProcessConfigType or undefined if the id is invalid.
 */
export const getProcessConfigTypeById = (id: number | undefined): ProcessConfigType => {
    switch (id) {
      case ProcessConfigType.STERILIZATION:
        return ProcessConfigType.STERILIZATION;
      case ProcessConfigType.PASTERIZATION:
        return ProcessConfigType.PASTERIZATION;
      case ProcessConfigType.CUSTOM:
        return ProcessConfigType.CUSTOM;
      default:
        console.log('Invalid id:', id);
        return ProcessConfigType.UNKNOWN;
    }
  }
  
/**
 * Retrieves the ProcessConfigMode based on the provided id.
 * @param id - The id of the ProcessConfigMode.
 * @returns The corresponding ProcessConfigMode or UNKNOWN if the id is invalid.
 */
export const getProcessConfigModeById = (id: number | undefined): ProcessConfigMode => {
  switch (id) {
    case ProcessConfigMode.TARGETF:
      return ProcessConfigMode.TARGETF;
    case ProcessConfigMode.TIME:
      return ProcessConfigMode.TIME;    
    default:
      console.log('Invalid id:', id);
      return ProcessConfigMode.UNKNOWN;
  }
}

/**
 * Retrieves the HeatingType based on the provided id.
 * @param id - The id of the HeatingType.
 * @returns The corresponding HeatingType or UNKNOWN if the id is invalid.
 */
export const getHeatingTypeById = (id: number | undefined): HeatingType => {
  switch (id) {
    case HeatingType.STEAM:
      return HeatingType.STEAM;
    case HeatingType.ELECTRIC:
      return HeatingType.ELECTRIC;
    case HeatingType.STEAM_ELECTRIC:
      return HeatingType.STEAM_ELECTRIC;
    default:
      console.log('Invalid id:', id);
      return HeatingType.UNKNOWN;
  }
}
import { ProcessConfigMode } from "@/types/grpc";
  
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
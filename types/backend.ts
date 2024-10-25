enum BackendGlobalError {
  DbError = 1,
  SerialError = 2,
  OldDataError = 3,
  SerialSendError = 4,
}

interface BackendError {
  errors: BackendGlobalError;
  errorsStrings: string[];
}

export const fetchDataSuccess = (dataInfo, responseKey) => (
  {
    type: 'FETCH_DATA_SUCCESS',
    responseKey: responseKey,
    payload: { dataInfo }
  }
);

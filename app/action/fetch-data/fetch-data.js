// @flow
import { fetchDataError } from './fetch-data-error';
import { fetchDataRequest } from './fetch-data-request';
import { fetchDataSuccess } from './fetch-data-success';
import config, { ARTICLES_URL, PAGES_URL, MODULES_URL } from '../../config/APIConfig';


// export const fetchData = (data) => ((dispatch) => {
//   dispatch(fetchDataRequest());
//   return fetch(config.API_URL)
//     .then((res) => res.json())
//     .then((dataInfo) => dispatch(fetchDataSuccess(dataInfo)))
//     .catch((err) => err);
// }
// );

export const fetchDataArticles = (data) => ((dispatch) => {
  dispatch(fetchDataRequest());
  return fetch(ARTICLES_URL(data.pageSize + "", data.pageIndex + ""))
    .then((res) => res.json())
    .then((dataInfo) => dispatch(fetchDataSuccess(dataInfo, 'ARTICLES_URL')))
    .catch((err) => err);
}
);

export const fetchDataPages = (data) => ((dispatch) => {
  dispatch(fetchDataRequest());
  return fetch(PAGES_URL(data.pageSize + "", data.pageIndex + ""))
    .then((res) => res.json())
    .then((dataInfo) => dispatch(fetchDataSuccess(dataInfo, 'PAGES_URL')))
    .catch((err) => err);
}
);

export const fetchDataModules = (data) => ((dispatch) => {
  dispatch(fetchDataRequest());
  return fetch(MODULES_URL(data.id))
    .then((res) => res.json())
    .then((dataInfo) => dispatch(fetchDataSuccess(dataInfo, 'MODULES_URL')))
    .catch((err) => err);
}
);


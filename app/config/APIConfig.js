// @flow

export const HOST = 'https://swastika.io';
const LANGUAGE = 'en-us';

export default {
};

export const ARTICLES_URL = (pageSize, pageIndex) => { return `${HOST}/api/${LANGUAGE}/articles/${pageSize}/${pageIndex}` };
export const PAGES_URL = (pageSize, pageIndex) => { return `${HOST}/api/${LANGUAGE}/page/list/${pageSize}/${pageIndex}` };
export const MODULES_URL = (id) => { return `${HOST}/api/${LANGUAGE}/page/details/fe/${id}` };
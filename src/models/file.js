import { routerRedux } from 'dva/router';
import { stringify } from 'querystring';
import { fileUpload, fileFetchAll } from '@/services/file';

import { setAuthority } from '@/utils/authority';

const FileModel = {
  namespace: 'file',
  state: {
    status: undefined,
  },
  effects: {
    *upload({ payload, callback }, { call, put }) {
      //console.log('check action: ', payload)
      const response = yield call(fileUpload, payload);
      yield put({
        type: 'changeFileStatus',
        payload: response,
      });
      if (callback) callback(response);
    },
    *fetchAll({ payload, callback }, { call, put }) {
      //console.log('check action: ', payload)
      const response = yield call(fileFetchAll);
      yield put({
        type: 'changeFileStatus',
        payload: response,
      });
      console.log('file response: ', response);
      if (callback) callback(response);
    },
  },
};
export default FileModel;

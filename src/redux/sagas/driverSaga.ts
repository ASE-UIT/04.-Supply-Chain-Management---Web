import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  setCreateDriver,
  setErrorDriver,
  setListDriver,
  setRemoveDriver,
  setUpdateDriver
} from "../reducers/driverReducers";
import { driverApis } from "../apis/driverApis";
import { driverActionNames } from "../actions/driverActions";

function* getListSaga(action: PayloadAction<any>): any {
  try {
    const data = yield call(driverApis.list);
    yield put(setListDriver(data.data));
  } catch (error) {
    yield put(setListDriver([]));
    yield put(setErrorDriver(error));
  }
}

function* createDriverSaga(action: PayloadAction<{ data: any }>): any {
  try {
    const data = yield call(driverApis.create, action.payload.data);
    yield put(setCreateDriver(data.data));
  } catch (error) {
    yield put(setErrorDriver(error));
  }
}

function* updateDriverSaga(
  action: PayloadAction<{ id: number; data: any }>
): any {
  try {
    const data = yield call(
      driverApis.update,
      action.payload.id,
      action.payload.data
    );
    yield put(setUpdateDriver(data.data));
  } catch (error) {
    yield put(setErrorDriver(error));
  }
}

function* deleteDriverSaga(action: PayloadAction<{ id: number }>): any {
  try {
    yield call(driverApis.delete, action.payload.id);
    yield put(setRemoveDriver(action.payload.id));
  } catch (error) {
    yield put(setErrorDriver(error));
  }
}

export function* watchGetListDriver() {
  yield takeLatest(driverActionNames.LIST, getListSaga);
}

export function* watchCreateDriver() {
  yield takeLatest(driverActionNames.CREATE, createDriverSaga);
}

export function* watchUpdateDriver() {
  yield takeLatest(driverActionNames.UPDATE, updateDriverSaga);
}

export function* watchDeleteDriver() {
  yield takeLatest(driverActionNames.DELETE, deleteDriverSaga);
}

const driverSagas = [
  watchGetListDriver,
  watchCreateDriver,
  watchUpdateDriver,
  watchDeleteDriver
];

export default driverSagas;

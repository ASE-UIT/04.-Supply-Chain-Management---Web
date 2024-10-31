import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { warehouseActionNames } from '../actions/warehouseActions';
import { warehouseApis } from '../apis/warehouseApis';
import { setCreateWarehouse, setErrorWarehouse, setListWarehouse, setRemoveWarehouse, setUpdateWarehouse } from '../reducers/warehouseReducers';

function* getListSaga(action: PayloadAction<any>): any {
    try {
        const data = yield call(warehouseApis.list);
        yield put(setListWarehouse(data.data));
    } catch (error) {
        yield put(setListWarehouse([]));
        yield put(setErrorWarehouse(error));
    }
}

function* createWarehouseSaga(action: PayloadAction<{ data: any }>): any {
    try {
        const data = yield call(warehouseApis.create, action.payload.data);
        yield put(setCreateWarehouse(data.data));
    } catch (error) {
        yield put(setErrorWarehouse(error));
    }
}

function* updateWarehouseSaga(action: PayloadAction<{ id: number, data: any }>): any {
    try {
        const data = yield call(warehouseApis.update, action.payload.id, action.payload.data);
        yield put(setUpdateWarehouse(data.data));
    } catch (error) {
        yield put(setErrorWarehouse(error));
    }
}

function* deleteWarehouseSaga(action: PayloadAction<{ id: number }>): any {
    try {
        yield call(warehouseApis.delete, action.payload.id);
        yield put(setRemoveWarehouse(action.payload.id));
    } catch (error) {
        yield put(setErrorWarehouse(error));
    }
}


export function* watchGetListWarehouse() {
    yield takeLatest(warehouseActionNames.LIST, getListSaga);
}

export function* watchCreateWarehouse() {
    yield takeLatest(warehouseActionNames.CREATE, createWarehouseSaga);
}

export function* watchUpdateWarehouse() {
    yield takeLatest(warehouseActionNames.UPDATE, updateWarehouseSaga);
}

export function* watchDeleteWarehouse() {
    yield takeLatest(warehouseActionNames.DELETE, deleteWarehouseSaga);
}

const warehouseSagas = [
    watchGetListWarehouse,
    watchCreateWarehouse,
    watchUpdateWarehouse,
    watchDeleteWarehouse,
];

export default warehouseSagas;

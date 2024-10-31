import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { partnerActionNames } from '../actions/partnerActions';
import { partnerApis } from '../apis/partnerApis';
import { setCreatePartner, setErrorPartner, setListPartner, setRemovePartner, setUpdatePartner } from '../reducers/partnerReducers';

function* getListSaga(action: PayloadAction<any>): any {
    try {
        const data = yield call(partnerApis.list);
        yield put(setListPartner(data.data));
    } catch (error) {
        yield put(setListPartner([]));
        yield put(setErrorPartner(error));
    }
}

function* createPartnerSaga(action: PayloadAction<{ data: any }>): any {
    try {
        const data = yield call(partnerApis.create, action.payload.data);
        yield put(setCreatePartner(data.data));
    } catch (error) {
        yield put(setErrorPartner(error));
    }
}

function* updatePartnerSaga(action: PayloadAction<{ id: number, data: any }>): any {
    try {
        const data = yield call(partnerApis.update, action.payload.id, action.payload.data);
        yield put(setUpdatePartner(data.data));
    } catch (error) {
        yield put(setErrorPartner(error));
    }
}

function* deletePartnerSaga(action: PayloadAction<{ id: number }>): any {
    try {
        yield call(partnerApis.delete, action.payload.id);
        yield put(setRemovePartner(action.payload.id));
    } catch (error) {
        yield put(setErrorPartner(error));
    }
}


export function* watchGetListPartner() {
    yield takeLatest(partnerActionNames.LIST, getListSaga);
}

export function* watchCreatePartner() {
    yield takeLatest(partnerActionNames.CREATE, createPartnerSaga);
}

export function* watchUpdatePartner() {
    yield takeLatest(partnerActionNames.UPDATE, updatePartnerSaga);
}

export function* watchDeletePartner() {
    yield takeLatest(partnerActionNames.DELETE, deletePartnerSaga);
}

const partnerSagas = [
    watchGetListPartner,
    watchCreatePartner,
    watchUpdatePartner,
    watchDeletePartner,
];

export default partnerSagas;

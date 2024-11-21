import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { legalpersonActionNames } from '../actions/legalpersonActions';
import { legalpersonApis } from '../apis/legalpersonApis';
import { setCreateLegalPerson, setErrorLegalPerson, setListLegalPerson, setRemoveLegalPerson, setUpdateLegalPerson } from '../reducers/legalpersonReducers';

function* getListSaga(action: PayloadAction<any>): any {
    try {
        const data = yield call(legalpersonApis.list);
        yield put(setListLegalPerson(data.data));
    } catch (error) {
        yield put(setListLegalPerson([]));
        yield put(setErrorLegalPerson(error));
    }
}

function* createLegalPersonSaga(action: PayloadAction<{ data: any }>): any {
    try {
        const data = yield call(legalpersonApis.create, action.payload.data);
        yield put(setCreateLegalPerson(data.data));
    } catch (error) {
        yield put(setErrorLegalPerson(error));
    }
}

function* updateLegalPersonSaga(action: PayloadAction<{ id: number, data: any }>): any {
    try {
        const data = yield call(legalpersonApis.update, action.payload.id, action.payload.data);
        yield put(setUpdateLegalPerson(data.data));
    } catch (error) {
        yield put(setErrorLegalPerson(error));
    }
}

function* deleteLegalPersonSaga(action: PayloadAction<{ id: number }>): any {
    try {
        yield call(legalpersonApis.delete, action.payload.id);
        yield put(setRemoveLegalPerson(action.payload.id));
    } catch (error) {
        yield put(setErrorLegalPerson(error));
    }
}


export function* watchGetListLegalPerson() {
    yield takeLatest(legalpersonActionNames.LIST, getListSaga);
}

export function* watchCreateLegalPerson() {
    yield takeLatest(legalpersonActionNames.CREATE, createLegalPersonSaga);
}

export function* watchUpdateLegalPerson() {
    yield takeLatest(legalpersonActionNames.UPDATE, updateLegalPersonSaga);
}

export function* watchDeleteLegalPerson() {
    yield takeLatest(legalpersonActionNames.DELETE, deleteLegalPersonSaga);
}

const legalpersonSagas = [
    watchGetListLegalPerson,
    watchCreateLegalPerson,
    watchUpdateLegalPerson,
    watchDeleteLegalPerson,
];

export default legalpersonSagas;

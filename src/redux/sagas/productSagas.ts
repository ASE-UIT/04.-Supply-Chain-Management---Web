import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { productActionNames } from '../actions/productActions';
import { productApis } from '../apis/productApis';
import { setCreateProduct, setErrorProduct, setListProduct, setRemoveProduct, setUpdateProduct } from '../reducers/productReducers';

function* getListSaga(action: PayloadAction<any>): any {
    try {
        const data = yield call(productApis.list);
        yield put(setListProduct(data.data));
    } catch (error) {
        yield put(setListProduct([]));
        yield put(setErrorProduct(error));
    }
}

function* createProductSaga(action: PayloadAction<{ data: any }>): any {
    try {
        const data = yield call(productApis.create, action.payload.data);
        yield put(setCreateProduct(data.data));
    } catch (error) {
        yield put(setErrorProduct(error));
    }
}

function* updateProductSaga(action: PayloadAction<{ id: number, data: any }>): any {
    try {
        const data = yield call(productApis.update, action.payload.id, action.payload.data);
        yield put(setUpdateProduct(data.data));
    } catch (error) {
        yield put(setErrorProduct(error));
    }
}

function* deleteProductSaga(action: PayloadAction<{ id: number }>): any {
    try {
        yield call(productApis.delete, action.payload.id);
        yield put(setRemoveProduct(action.payload.id));
    } catch (error) {
        yield put(setErrorProduct(error));
    }
}


export function* watchGetListProduct() {
    yield takeLatest(productActionNames.LIST, getListSaga);
}

export function* watchCreateProduct() {
    yield takeLatest(productActionNames.CREATE, createProductSaga);
}

export function* watchUpdateProduct() {
    yield takeLatest(productActionNames.UPDATE, updateProductSaga);
}

export function* watchDeleteProduct() {
    yield takeLatest(productActionNames.DELETE, deleteProductSaga);
}

const productSagas = [
    watchGetListProduct,
    watchCreateProduct,
    watchUpdateProduct,
    watchDeleteProduct,
];

export default productSagas;

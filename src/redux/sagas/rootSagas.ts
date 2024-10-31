import { all, fork } from 'redux-saga/effects';
import userSagas from './userSagas';
import partnerSagas from './partnerSagas';
import warehouseSagas from './warehouseSagas';

const allSaga = [
	...userSagas,
	...partnerSagas,
	...warehouseSagas,
];

function* rootSagas() {
	yield all(allSaga.map((saga) => fork(saga)))
}

export default rootSagas;

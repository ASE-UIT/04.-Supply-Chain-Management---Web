import { all, fork } from 'redux-saga/effects';
import userSagas from './userSagas';
import partnerSagas from './partnerSagas';

const allSaga = [
	...userSagas,
	...partnerSagas,
];

function* rootSagas() {
	yield all(allSaga.map((saga) => fork(saga)))
}

export default rootSagas;

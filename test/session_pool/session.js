import { expect } from 'chai';

import Session from '../../build/session_pool/session';
import SessionPool from '../../build/session_pool/session_pool';

import Apify from '../../build';


describe('Session - testing session behaviour ', async () => {
    let sessionPool;
    let session;

    beforeEach(() => {
        sessionPool = new SessionPool();
        session = new Session({ sessionPool });
    });

    it('should reclaim session and lower the errorScore', () => {
        expect(session.usageCount).to.be.eql(0);
        expect(session.errorScore).to.be.eql(0);
        session.reclaim();
        expect(session.usageCount).to.be.eql(1);
        expect(session.errorScore).to.be.eql(0);
        session.errorScore = 1;
        session.reclaim();
        expect(session.errorScore).to.be.eql(0.5);
    });

    it('should mark session failed', () => {
        session.fail();
        expect(session.errorScore).to.be.eql(1);
        expect(session.usageCount).to.be.eql(1);
    });

    it('should expire session', async () => {
        session = new Session({ maxAgeSecs: 1 / 100, sessionPool });
        await Apify.utils.sleep(101);
        expect(session.isExpired()).to.be.eql(true);
        expect(session.isUsable()).to.be.eql(false);
    });

    it('should max out session usage', () => {
        session.maxSessionUsageCount = 1;
        session.reclaim();
        expect(session.isMaxUseCountReached()).to.be.eql(true);
        expect(session.isUsable()).to.be.eql(false);
    });

    it('should block session', () => {
        session.errorScore += session.maxErrorScore;
        expect(session.isBlocked()).to.be.eql(true);
        expect(session.isUsable()).to.be.eql(false);
    });

    it('should get state', () => {
        const state = session.getState();

        expect(state.id).to.exist; // eslint-disable-line
        expect(state.cookies).to.exist;  // eslint-disable-line
        expect(state.userData).to.exist;  // eslint-disable-line
        expect(state.maxErrorScore).to.exist;  // eslint-disable-line
        expect(state.errorScoreDecrement).to.exist;  // eslint-disable-line
        expect(state.expiresAt).to.exist;  // eslint-disable-line
        expect(state.createdAt).to.exist;  // eslint-disable-line
        expect(state.usageCount).to.exist;  // eslint-disable-line
        expect(state.errorScore).to.exist;  // eslint-disable-line


        Object.entries(state).forEach(([key, value]) => {
            expect(session[key]).to.be.eql(value);
        });
    });
});
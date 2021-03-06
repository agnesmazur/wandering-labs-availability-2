
import moment from 'moment';
import sinon from 'sinon';

import { testHelper, Factory, ModelData, Nocks } from '../../shared/test/test-helper';
import { AvailabilityRequest, AvailabilityRequestRepo } from '../src/shared/repos/availability-request';
import { Sns } from '../src/shared/utils/sns';

import app from '../src/app';

describe('Worker', () => {
  describe('#handler', ()=> {
    let availabilityRequest;
    let spy;

    before(()=> {
      spy = sinon.spy(testHelper.context, 'succeed');
      return Factory.availabilityRequestRepo({ premium: true }).then((factoryObj) => {
        availabilityRequest = factoryObj.id;
      });

    });

    it ('should run a test', function() {
      return app.handler({},testHelper.context).then(() => {
        assert(spy.withArgs('sent active requests').calledOnce);
      });
    });
  });
});

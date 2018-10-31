import { expect } from 'chai';
import getValue from '../src/getValue';
import setup from './setup';

describe('getValue', () => {
  let result;
  describe('getValue valid string json', () => {
    before(setup);
    it('Given localStoage has a json value', () => {
      localStorage.setItem('test', '{ "key": "value" }');
    });
    it('When I get the value for the key', () => {
      result = getValue('test');
    });
    it('Then the value should be the correct object', () => {
      expect(result).to.be.eql({ key: 'value' });
    });
  });

  describe('getValue valid string (invalid json)', () => {
    before(setup);
    it('Given localStoage has a string value', () => {
      localStorage.setItem('test', 'value');
    });
    it('When I get the value for the key', () => {
      result = getValue('test');
    });
    it('Then the value should be the correct string', () => {
      expect(result).to.be.eql('value');
    });
  });

  describe('getValue without match', () => {
    before(setup);
    it('When I get the value with non existent key', () => {
      result = getValue('DOES_NOT_EXIST');
    });
    it('Then it should be null', () => {
      expect(result).to.be.eql(null);
    });
  });
});

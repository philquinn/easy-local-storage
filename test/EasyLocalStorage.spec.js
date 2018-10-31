
import { expect } from 'chai';
import EasyLocalStorage from '../src';
import setup from './setup';

describe('EasyLocalStorage', () => {
  let storage;
  let result;
  describe('EasyLocalStorage valid json', () => {
    before(setup);
    it('Given localStoage has a json value', () => {
      localStorage.setItem('test', '{ "key": "value" }');
    });
    it('When I get the value for the key', () => {
      storage = new EasyLocalStorage();
      result = storage.get('test');
    });
    it('Then should retrieve the correct object', () => {
      expect(result).to.be.eql({ key: 'value' });
    });
  });
  describe('EasyLocalStorage valid string', () => {
    before(setup);
    it('Given localStoage has a string value', () => {
      localStorage.setItem('test', 'value');
    });
    it('When I get the value for the key', () => {
      storage = new EasyLocalStorage();
      result = storage.get('test');
    });
    it('Then should retrieve the correct string', () => {
      expect(result).to.be.eql('value');
    });
  });
  describe('EasyLocalStorage valid string', () => {
    before(setup);
    it('Given localStoage has a string value', () => {
      localStorage.setItem('test', "{ key: 'value' }");
    });
    it('When I get the value for the key', () => {
      storage = new EasyLocalStorage();
      result = storage.get('test');
    });
    it('Then should retrieve the correct string', () => {
      expect(result).to.be.eql("{ key: 'value' }");
    });
  });
  describe('EasyLocalStorage ', () => {
    before(setup);
    it('When I add a new value', () => {
      storage = new EasyLocalStorage();
      storage.add('test', { key: 'new value' });
    });
    it('Then the value should be set correctly in localStorage', () => {
      result = localStorage.getItem('test');
      expect(result).to.be.eql(JSON.stringify({ key: 'new value' }));
    });
  });
  describe('EasyLocalStorage add string (invalid json)', () => {
    before(setup);
    it('When I add invalid json', () => {
      storage = new EasyLocalStorage();
      storage.add('test', "{ key: 'new value' }");
    });
    it('Then the value should be set as a string', () => {
      result = localStorage.getItem('test');
      expect(result).to.be.eql("{ key: 'new value' }");
    });
  });
  describe('EasyLocalStorage getAll', () => {
    before(setup);
    it('Given localStoage has some values', () => {
      localStorage.setItem('test', '{ "key": "value" }');
      localStorage.setItem('test2', '{ "key": "value2" }');
    });
    it('When I get all the values', () => {
      storage = new EasyLocalStorage();
      result = storage.getAll();
    });
    it('Then it should return an object with all values', () => {
      expect(result).to.be.eql({
        test: { key: 'value' },
        test2: { key: 'value2' },
      });
    });
  });
});

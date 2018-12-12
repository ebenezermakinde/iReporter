import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const { expect } = chai;

chai.use(chaiHttp);

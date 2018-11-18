/* eslint-env jest */
// @flow
import { getRandom } from '/'

import Client from 'lib/Client'

const urljoin = require('url-join')
const expect:ExpectChain  = require('chai').expect
const assert  = require('chai').assert

const {
    PORT,
    HOST
} = process.env

const clientUrl = `http://${HOST || 'localhost'}:${PORT}`

// A simple example test
describe('Auth API tests', () => {

    it('Check demo API is up', async () => {
        await Client.get(urljoin(clientUrl,'/'))
    })

    it('Check auth API is blocked', async () => {
        let _thrown = false
        try {
        
            const a = await Client.get(urljoin(clientUrl,'/testauth'))
        }catch(err){
            assert.strictEqual(err.response.status,401,'Response status code was expected to be 401 (Unauthorised)')
            _thrown = true
        }

        assert.isTrue(_thrown,'Expected to throw an error!')
    })
    it('Check Authorization need to be set', async () => {
        let _thrown = false
        try {
            const a = await Client.get(urljoin(clientUrl,'/testauth'),{
                headers: {}
            })
        }catch(err){
            assert.isTrue(err.response.data.message.indexOf(' header not set') > -1,'Expected to report Authorization not set')
            _thrown = true
        }

        assert.isTrue(_thrown,'Expected to throw an error!')
    })
    it('Check X-User-Id need to be set', async () => {
        let _thrown = false
        try {
            const a = await Client.get(urljoin(clientUrl,'/testauth'),{
                headers: {
                    'Authorization': 'Bearer ' + 'incorrect token'
                }
            })
        }catch(err){
            assert.isTrue(err.response.data.message.indexOf('Required X-User-Id header not set') > -1,'Expected to report X-User-Id not set')
            _thrown = true
        }

        assert.isTrue(_thrown,'Expected to throw an error!')
    })

    it('Check auth API Authorisation header is set but invalid', async () => {
        let _thrown = false
        try {
        
            const a = await Client.get(urljoin(clientUrl,'/testauth'),{
                headers: {
                    'Authorization': 'Bearer ' + 'incorrect token'
                }
            })
        }catch(err){
            assert.strictEqual(err.response.status,401,'Response status code was expected to be 401 (Unauthorised)')
            _thrown = true
        }

        assert.isTrue(_thrown,'Expected to throw an error!')
    })

})
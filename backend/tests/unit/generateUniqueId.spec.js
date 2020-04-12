const generateUniqueId = require('../../src/utils/generateUniqueId')

describe('Generate unique ID', () => {
    it('must generate a unique ID', () => {
        const id = generateUniqueId();

        expect(id).toHaveLength(8);
    })
})
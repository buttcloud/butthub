const { map } = require('ramda')

const Hub = require('./hub')
const Pub = require('./pub')

module.exports = Stack

const Pubs = map(Pub)

function Stack ({ hub, pubs }) {
  return {
    networks: [
      {
        name: 'web',
        driver: 'overlay'
      }
    ],
    stacks: [
      Hub(hub),
      ...Pubs(pubs)
    ]
  }
}

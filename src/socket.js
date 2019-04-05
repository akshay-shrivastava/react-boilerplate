import Io from 'socket.io-client'

let rootSocket
let reduxStore
const rooms = {}
export const TEST_ROOM = 'TEST_ROOM'

const connectedIfNeeded = () => {
  if (rootSocket.disconnected) {
    console.info('Room added. Establishing connection...')
    rootSocket.connect()
  }
}

const disconnectIfNotNeeded = () => {
  if (Object.keys(rooms).length) {
    console.info('No rooms connected. Destroying connection...')
    rootSocket.disconnect()
  }
}

const addRoom = room => {
  rooms[room] = true
  connectedIfNeeded()
}

const removeRoom = room => {
  delete rooms[room]
  disconnectIfNotNeeded()
}

export const joinRoom = room => {
  console.info('joining room', room)
  addRoom(room)
  rootSocket.emit('join', room)
}

export const leaveRoom = room => {
  console.info('leaving room', room)
  rootSocket.emit('leave', room)
  removeRoom(room)
}

const initSocket = () => {
  // creating a socket but not postponing connection until needed
  rootSocket = new Io('/', { autoConnect: false })
  // this is a sample socket connection with redux action
  rootSocket.on('redux-action', function(data) {
    reduxStore.dispatch(data)
  })
  rootSocket.on('connect', function() {
    console.info('connection created')
  })
  rootSocket.on('disconnect', function(data) {
    console.info('disconnected from server', data)
  })
  rootSocket.on('connection-accepted', function(data) {
    console.info('connection-accepted', data)
  })
  rootSocket.on('reconnecting', attemptNumber => {
    console.info('reconnecting... Attempt No: ', attemptNumber)
  })
  rootSocket.on('reconnect_failed', () => {
    console.info('reconnect_failed')
  })
  rootSocket.on('reconnect', attemptNumber => {
    console.info('reconnection successful. Attempt No: ', attemptNumber)
  })
}

export default store => {
  reduxStore = store
  console.info('Initializing socket connection')
  initSocket()
  return next => action => {
    return next(action)
  }
}

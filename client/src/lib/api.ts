const events = [
  {
    id: 'm5gr84i9',

    name: 'PandomName',

    priority: 0,

    type: 'crosspromo',

    description: 'description'
  },

  {
    id: '3u1reuv4',

    name: 'randomName',

    priority: 5,

    type: 'liveops',

    description: 'description'
  },

  {
    id: 'derv1ws0',

    name: 'GandomName',

    priority: 8,

    type: 'app',

    description: 'description'
  },

  {
    id: '5kma53ae',

    name: 'AandomName',

    priority: 10,
    type: 'ads',
    description: 'description'
  },

  {
    id: 'bhqecj4p',

    name: 'ZandomName',

    priority: 5,

    type: 'ads',

    description: 'Very long descirption we never know who goes crazy with explaining description'
  }
]

export const getEventDataById = (id: string) => {
  return events.find((event) => event.id === id)
}

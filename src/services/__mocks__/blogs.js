const blogs = [
  {
    title: 'workflows of refactoring',
    author: 'Martin Fowler',
    url: 'https://martinfowler.com',
    likes: 5,
    user: {
      username: 'mjl',
      name: 'Matti',
      id: '5c6b2f8dbb4eaf554f47f25d'
    },
    id: '5c6c0ce0c7441859e108c3f9'
  },
  {
    title: 'Our learnings from adopting GraphQL',
    author: 'Artem Statnow',
    url: 'https://blog.gql.com',
    likes: 5,
    user: {
      username: 'mjl',
      name: 'Matti',
      id: '5c6b2f8dbb4eaf554f47f25d'
    },
    id: '5c6c1104c7441859e108c3fb'
  },
  {
    title: 'Backend Development',
    author: 'V. Virtanen',
    url: 'https://wordspot.dev.com',
    likes: 7,
    user: {
      username: 'mjl',
      name: 'Matti',
      id: '5c6b2f8dbb4eaf554f47f25d'
    },
    id: '5c6c828d2df9170a96a22dce'
  },
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }
import { nextCsrf } from 'next-csrf'

const { csrf, setup } = nextCsrf({
  // eslint-disable-next-line no-undef
  secret: process.env.NEXT_PUBLIC_CSRF_SECRET
})

export { csrf, setup }
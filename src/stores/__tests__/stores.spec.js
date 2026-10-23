import {beforeEach, describe, expect, it, vi} from 'vitest'
import {createPinia, setActivePinia} from 'pinia'
import supabaseClient from '@/lib/supabaseClient'
import {useAuthStore} from '@/stores/auth'
import {useJournalStore} from '@/stores/journal'

vi.mock('@/lib/supabaseClient', () => ({
  default: {auth: {signInWithPassword: vi.fn()}, from: vi.fn()},
}))

describe('auth store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('clears a previous error when a later sign-in succeeds', async () => {
    const auth = useAuthStore()
    supabaseClient.auth.signInWithPassword
      .mockResolvedValueOnce({data: {}, error: {message: 'bad credentials'}})
      .mockResolvedValueOnce({data: {user: {id: 1}, session: {}}, error: null})

    await auth.signIn('a@b.co', 'x')
    expect(auth.error).toBe('bad credentials')

    await auth.signIn('a@b.co', 'x')
    expect(auth.error).toBeNull()
  })
})

describe('journal store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('does not need a signed-in user until an action runs', () => {
    expect(() => useJournalStore()).not.toThrow()
  })

  it('stores the single row returned by create and update', async () => {
    useAuthStore().user = {id: 'u1'}
    const row = {id: 1, title: 't', content: 'c'}
    const query = {insert: () => query, update: () => query, eq: () => query, select: () => query,
      single: () => Promise.resolve({data: row, error: null})}
    supabaseClient.from.mockReturnValue(query)

    const store = useJournalStore()
    await store.createJournal('t', 'c')
    expect(store.journals).toEqual([row])

    row.title = 'new'
    await store.updateJournal(1, 'new', 'c')
    expect(store.journals[0].title).toBe('new')
    expect(store.error).toBeNull()
  })
})

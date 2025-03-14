import getAnswer from './answer'
import { describe, expect, test } from '@jest/globals'

describe('getting answers', () => {
  test('it returns 42', () => {
    const res = getAnswer()
    expect(res).toBe(42)
  })
})

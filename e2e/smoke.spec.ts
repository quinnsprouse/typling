import { expect, test } from '@playwright/test'

test('home page renders with keyboard and typing prompt', async ({ page }) => {
  const pageErrors: Error[] = []
  page.on('pageerror', (error) => {
    pageErrors.push(error)
  })

  await page.goto('/')

  await expect(page.getByRole('heading', { name: /typling/i })).toBeVisible()

  await expect(
    page.getByRole('radiogroup', { name: 'Memory mode' })
  ).toBeVisible()

  await expect(page.getByLabel('Typing prompt')).toBeVisible()

  expect(pageErrors).toHaveLength(0)
})

import { expect, test } from '@playwright/test'

test('home page renders and snippet copy flow works', async ({ page }) => {
  const pageErrors: Error[] = []
  page.on('pageerror', (error) => {
    pageErrors.push(error)
  })

  await page.goto('/')

  await expect(page.getByRole('link', { name: 'TanStack' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'shadcn/ui' })).toBeVisible()
  await expect(
    page.getByRole('heading', { name: /starter kit/i })
  ).toBeVisible()

  const copyButton = page.getByRole('button', { name: 'Copy to clipboard' })
  await copyButton.click()

  await expect(copyButton).toBeVisible()
  expect(pageErrors).toHaveLength(0)
})

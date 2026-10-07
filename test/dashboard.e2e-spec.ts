import { expect, test } from '@playwright/test'

test('display day orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const cardTitle = page.getByText('Pedido (dia)', { exact: true })
  const amount = page.getByText('20', { exact: true })
  const diff = page.getByText('-5% menos pedidos que ontem')

  await expect(cardTitle).toBeVisible()
  await expect(amount).toBeVisible()
  await expect(diff).toBeVisible()
})

test('display month orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const cardTitle = page.getByText('Pedidos (mês)', { exact: true })
  const amount = page.getByText('200', { exact: true })
  const diff = page.getByText('+7% em relação ao mes')

  await expect(cardTitle).toBeVisible()
  await expect(amount).toBeVisible()
  await expect(diff).toBeVisible()
})

test('display month canceled orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const cardTitle = page.getByText('Cancelamentos (mês)', { exact: true })
  const amount = page.getByText('5', { exact: true })
  const diff = page.getByText('-5% em relação ao mes')

  await expect(cardTitle).toBeVisible()
  await expect(amount).toBeVisible()
  await expect(diff).toBeVisible()
})

test('display month revenue metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const cardTitle = page.getByText('Receita total (mês)', { exact: true })
  const amount = page.getByText(/R\$\s*200,00/)
  const diff = page.getByText('+10% em relação ao mes')

  await expect(cardTitle).toBeVisible()
  await expect(amount).toBeVisible()
  await expect(diff).toBeVisible()
})

test('display revenue in period chart', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const chartTitle = page.getByText('Receita no período', { exact: true })
  const chartDescription = page.getByText('Receita diária no período', {
    exact: true,
  })
  const periodLabel = page.getByText('Período', { exact: true })
  const periodPicker = page.getByRole('button', {
    name: /\w{3} \d{2}, \d{4} - \w{3} \d{2}, \d{4}/,
  })

  await expect(chartTitle).toBeVisible()
  await expect(chartDescription).toBeVisible()
  await expect(periodLabel).toBeVisible()
  await expect(periodPicker).toBeVisible()
})

test('display popular products chart', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const chartTitle = page.getByText('Produtos populares', { exact: true })

  await expect(chartTitle).toBeVisible()
  await expect(page.locator('.recharts-pie')).toBeVisible()
})

import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import { expect, test, type Page } from '@playwright/test'

const require = createRequire(import.meta.url)
const axePath = require.resolve('axe-core/axe.min.js')
const index = JSON.parse(readFileSync(new URL('../registry/react/index.json', import.meta.url), 'utf8')) as {
  name: string
  type: string
}[]
const components = index.filter((i) => i.type === 'registry:ui').map((i) => i.name)

async function openComponent(page: Page, name: string, theme: 'light' | 'dark' = 'light') {
  await page.addInitScript((t) => localStorage.setItem('denseui-theme', t), theme)
  await page.goto(`/#/components/${name}`)
  await expect(page.locator('article header h1')).toBeVisible()
  await expect(page.locator('[data-docs-loading]')).toHaveCount(0)
}

test.describe('every component page', () => {
  for (const name of components) {
    test(`${name}: renders without runtime errors`, async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))
      page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()))
      await openComponent(page, name)
      await expect(page.locator('#preview')).not.toContainText('No demo yet')
      expect(errors).toEqual([])
    })

    test(`${name}: preview has no serious accessibility violations`, async ({ page }) => {
      await openComponent(page, name)
      await page.addScriptTag({ path: axePath })
      const violations = await page.evaluate(async () => {
        // @ts-expect-error axe is injected at runtime
        const result = await window.axe.run('#preview [data-part=content]:not([hidden])', {
          runOnly: ['wcag2a', 'wcag2aa'],
          rules: { 'color-contrast': { enabled: false } },
        })
        return result.violations
          .filter((v: { impact: string }) => v.impact === 'serious' || v.impact === 'critical')
          .map((v: { id: string; nodes: { target: string[] }[] }) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)
      })
      expect(violations).toEqual([])
    })
  }
})

test.describe('interactions', () => {
  test('docs nav: previous/next follow the current component', async ({ page }) => {
    await openComponent(page, 'dialog')
    await expect(page.getByRole('link', { name: 'Previous: Date Picker' })).toHaveAttribute('href', '#/components/date-picker')
    await expect(page.getByRole('link', { name: 'Next: Drawer' })).toHaveAttribute('href', '#/components/drawer')
  })

  test('calendar: selecting a day marks it selected', async ({ page }) => {
    await openComponent(page, 'calendar')
    const day = page.locator('#preview [data-part=table-cell-trigger]:not([data-outside-range])').nth(10)
    await day.click()
    await expect(day).toHaveAttribute('data-selected', '')
  })

  test('date picker: open, pick a date, input updates', async ({ page }) => {
    await openComponent(page, 'date-picker')
    const input = page.locator('#preview [data-slot=date-picker-input]').first()
    await page.locator('#preview [data-scope=date-picker][data-part=trigger]').first().click()
    await page.locator('[data-slot=date-picker-content] [data-part=table-cell-trigger]:not([data-outside-range])').nth(5).click()
    await expect(input).not.toHaveValue('')
  })

  test('carousel: next moves to the second slide', async ({ page }) => {
    await openComponent(page, 'carousel')
    const indicators = page.locator('#preview [data-part=indicator]')
    await expect(indicators.first()).toHaveAttribute('data-current', '')
    await page.locator('#preview [data-slot=carousel-next]').click()
    await expect(indicators.nth(1)).toHaveAttribute('data-current', '')
  })

  test('resizable: dragging a handle resizes panels', async ({ page }) => {
    await openComponent(page, 'resizable')
    const panel = page.locator('#preview [data-slot=resizable-panel]').first()
    const before = (await panel.boundingBox())!.width
    const handle = (await page.locator('#preview [data-slot=resizable-handle]').first().boundingBox())!
    await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2)
    await page.mouse.down()
    await page.mouse.move(handle.x + 80, handle.y + handle.height / 2, { steps: 5 })
    await page.mouse.up()
    expect((await panel.boundingBox())!.width).toBeGreaterThan(before + 40)
  })

  test('toast: success toast appears', async ({ page }) => {
    await openComponent(page, 'toast')
    await page.getByRole('button', { name: 'Success' }).click()
    await expect(page.locator('[data-slot=toast]')).toContainText('Changes saved')
  })

  for (const side of ['left', 'right', 'top', 'bottom']) {
    test(`sheet: opens from the ${side}`, async ({ page }) => {
      await openComponent(page, 'sheet')
      await page.locator('#preview').getByRole('button', { name: side, exact: true }).click()
      const content = page.locator(`[data-slot=sheet-content][data-side=${side}]`)
      await expect(content).toBeVisible()
      await page.keyboard.press('Escape')
      await expect(content).toHaveCount(0)
    })
  }

  test('navigation menu: trigger opens its panel', async ({ page }) => {
    await openComponent(page, 'navigation-menu')
    await page.locator('#preview [data-slot=navigation-menu-trigger]').first().click()
    await expect(page.locator('#preview [data-slot=navigation-menu-content]').first()).toBeVisible()
  })

  test('drawer: opens and closes with Escape', async ({ page }) => {
    await openComponent(page, 'drawer')
    await page.getByRole('button', { name: 'Open drawer' }).click()
    await expect(page.locator('[data-slot=drawer-content]')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.locator('[data-slot=drawer-content]')).toHaveCount(0)
  })

  test('menubar: arrow keys move between menus', async ({ page }) => {
    await openComponent(page, 'menubar')
    await page.locator('#preview [data-slot=menubar-trigger]', { hasText: 'File' }).click()
    await expect(page.locator('[data-slot=dropdown-menu-item]', { hasText: 'New tab' })).toBeVisible()
    await page.keyboard.press('ArrowRight')
    await expect(page.locator('[data-slot=dropdown-menu-item]', { hasText: 'Undo' })).toBeVisible()
    await page.keyboard.press('ArrowLeft')
    await expect(page.locator('[data-slot=dropdown-menu-item]', { hasText: 'New tab' })).toBeVisible()
  })

  test('sidebar: becomes a sheet on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 480, height: 900 })
    await openComponent(page, 'sidebar')
    await expect(page.locator('#preview aside[data-slot=sidebar]')).toHaveCount(0)
    await page.locator('#preview [data-slot=sidebar-trigger]').click()
    await expect(page.locator('[data-slot=sidebar][data-mobile=true]')).toBeVisible()
  })

  test('data table: shift-click selects a range', async ({ page }) => {
    await openComponent(page, 'data-table')
    const boxes = page.locator('#preview tbody [data-slot=checkbox]')
    await boxes.nth(1).click()
    await boxes.nth(5).click({ modifiers: ['Shift'] })
    await expect(page.locator('#preview [data-slot=data-table-pagination]')).toContainText('5 of 64 row(s) selected')
  })

  test('data table: server-side example pages through remote data', async ({ page }) => {
    await openComponent(page, 'data-table')
    const server = page.locator('#examples [data-slot=data-table]')
    await expect(server.locator('[data-slot=data-table-pagination]')).toContainText('Page 1 of 124')
    await server.getByRole('button', { name: 'Next page' }).click()
    await expect(server.locator('[data-slot=data-table-pagination]')).toContainText('Page 2 of 124')
    await expect(server.locator('tbody tr').first()).toContainText('ORD-10010')
  })

  test('mobile docs: menu opens the navigation sheet', async ({ page }) => {
    await page.setViewportSize({ width: 420, height: 860 })
    await page.goto('/#/components/button')
    await page.getByRole('button', { name: 'Open navigation' }).click()
    await page.getByRole('navigation', { name: 'Documentation' }).getByRole('link', { name: 'Tabs' }).click()
    await expect(page.locator('article header h1')).toHaveText('Tabs')
  })
})

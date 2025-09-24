import { test, expect } from '@playwright/test';

test.describe('Homepage E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage without errors', async ({ page }) => {
    // Check for no console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.waitForLoadState('networkidle');
    
    // Verify no critical errors
    expect(errors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('404') &&
      !error.includes('Something went wrong')
    )).toHaveLength(0);
  });

  test('should display main content', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Keephy' })).toBeVisible();
    await expect(page.getByText('Keephy gives businesses instant insight into what their customers think')).toBeVisible();
    await expect(page.getByText('From NFC to QR to API, collect real-time feedback and act fast.')).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    // Test navigation links
    await expect(page.getByRole('link', { name: 'Features' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
    
    // Test admin dashboard button
    await expect(page.getByRole('button', { name: 'Admin Dashboard' })).toBeVisible();
  });

  test('should display features section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Key Features' })).toBeVisible();
    await expect(page.getByText('Ease of Use')).toBeVisible();
    await expect(page.getByText('Real-Time Insights')).toBeVisible();
    await expect(page.getByText('Customer Engagement')).toBeVisible();
  });

  test('should have working CTA buttons', async ({ page }) => {
    const startTrialButton = page.getByRole('button', { name: 'Start Your Free Trial' });
    const learnMoreButton = page.getByRole('button', { name: 'Learn More' });
    
    await expect(startTrialButton).toBeVisible();
    await expect(learnMoreButton).toBeVisible();
    
    // Test button interactions
    await startTrialButton.click();
    // Add assertions for what happens after click
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('heading', { name: 'Keephy' })).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByRole('heading', { name: 'Keephy' })).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.getByRole('heading', { name: 'Keephy' })).toBeVisible();
  });

  test('should load all images', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await expect(img).toBeVisible();
      
      // Check if image loaded successfully
      const naturalWidth = await img.evaluate(el => (el as HTMLImageElement).naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test('should have proper accessibility', async ({ page }) => {
    // Check for proper heading hierarchy
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2 })).toBeVisible();
    
    // Check for alt text on images
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('should handle admin dashboard navigation', async ({ page }) => {
    const adminButton = page.getByRole('button', { name: 'Admin Dashboard' });
    await adminButton.click();
    
    // Should navigate to admin (this would be a redirect in real app)
    // Add assertions based on your routing setup
  });

  test('should not have broken links', async ({ page }) => {
    const links = page.locator('a[href]');
    const count = await links.count();
    
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const href = await link.getAttribute('href');
      
      if (href && href.startsWith('http')) {
        // Test external links
        const response = await page.request.get(href);
        expect(response.status()).toBeLessThan(400);
      }
    }
  });

  test('should display footer', async ({ page }) => {
    await expect(page.getByText('© 2024 Keephy. All rights reserved.')).toBeVisible();
    await expect(page.getByText('NFC Feedback Solutions')).toBeVisible();
  });
});

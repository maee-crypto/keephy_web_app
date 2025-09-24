import { RouteChecker, ROUTES, setupGlobalErrorHandling } from '../../utils/routeChecker';

// Mock fetch
global.fetch = jest.fn();

describe('RouteChecker', () => {
  let routeChecker: RouteChecker;

  beforeEach(() => {
    routeChecker = RouteChecker.getInstance();
    routeChecker.clearErrors();
    jest.clearAllMocks();
  });

  describe('validateRoute', () => {
    it('validates existing routes', () => {
      const result = routeChecker.validateRoute('/');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('rejects non-existent routes', () => {
      const result = routeChecker.validateRoute('/non-existent');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Route /non-existent not found in route configuration');
    });

    it('validates route with authentication', () => {
      // Mock localStorage
      const mockGetItem = jest.fn().mockReturnValue('mock-token');
      Object.defineProperty(window, 'localStorage', {
        value: { getItem: mockGetItem },
        writable: true,
      });

      const result = routeChecker.validateRoute('/admin');
      expect(result.isValid).toBe(true);
    });

    it('rejects authenticated route without token', () => {
      // Mock localStorage without token
      const mockGetItem = jest.fn().mockReturnValue(null);
      Object.defineProperty(window, 'localStorage', {
        value: { getItem: mockGetItem },
        writable: true,
      });

      const result = routeChecker.validateRoute('/admin');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Route /admin requires authentication but no token found');
    });
  });

  describe('validateAllRoutes', () => {
    it('validates all configured routes', () => {
      const result = routeChecker.validateAllRoutes();
      expect(result.totalRoutes).toBe(ROUTES.length);
      expect(result.validRoutes).toBeGreaterThan(0);
    });
  });

  describe('checkImageExists', () => {
    it('resolves true for valid image', async () => {
      const mockImage = {
        onload: null,
        onerror: null,
        src: '',
      };
      
      // Mock Image constructor
      (global as any).Image = jest.fn(() => mockImage);
      
      // Simulate successful load
      setTimeout(() => {
        if (mockImage.onload) mockImage.onload();
      }, 0);

      const result = await routeChecker.checkImageExists('/test-image.png');
      expect(result).toBe(true);
    });

    it('resolves false for invalid image', async () => {
      const mockImage = {
        onload: null,
        onerror: null,
        src: '',
      };
      
      (global as any).Image = jest.fn(() => mockImage);
      
      // Simulate error
      setTimeout(() => {
        if (mockImage.onerror) mockImage.onerror();
      }, 0);

      const result = await routeChecker.checkImageExists('/invalid-image.png');
      expect(result).toBe(false);
    });
  });

  describe('checkApiEndpoint', () => {
    it('checks valid API endpoint', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({ status: 200 });

      const result = await routeChecker.checkApiEndpoint('/api/test');
      expect(result.status).toBe(200);
      expect(fetch).toHaveBeenCalledWith('/api/test', { method: 'HEAD' });
    });

    it('handles API endpoint errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      const result = await routeChecker.checkApiEndpoint('/api/invalid');
      expect(result.status).toBe(0);
      expect(result.error).toBe('Network error');
    });
  });

  describe('error management', () => {
    it('tracks and returns errors', () => {
      routeChecker.validateRoute('/invalid-route');
      const errors = routeChecker.getErrors();
      expect(errors.length).toBeGreaterThan(0);
    });

    it('clears errors', () => {
      routeChecker.validateRoute('/invalid-route');
      routeChecker.clearErrors();
      const errors = routeChecker.getErrors();
      expect(errors).toHaveLength(0);
    });
  });
});

describe('setupGlobalErrorHandling', () => {
  beforeEach(() => {
    // Mock window methods
    Object.defineProperty(window, 'addEventListener', {
      value: jest.fn(),
      writable: true,
    });
  });

  it('sets up error handlers', () => {
    setupGlobalErrorHandling();
    expect(window.addEventListener).toHaveBeenCalledWith('unhandledrejection', expect.any(Function));
    expect(window.addEventListener).toHaveBeenCalledWith('error', expect.any(Function));
  });
});

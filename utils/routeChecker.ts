// Centralized Route Checker for Web App
export interface RouteConfig {
  path: string;
  component: string;
  requiresAuth: boolean;
  allowedRoles?: string[];
  meta?: {
    title: string;
    description?: string;
    keywords?: string[];
  };
}

export const ROUTES: RouteConfig[] = [
  {
    path: '/',
    component: 'HomePage',
    requiresAuth: false,
    meta: {
      title: 'Keephy - NFC Feedback Solutions',
      description: 'Collect real-time customer feedback with NFC, QR codes, and API integration.',
      keywords: ['NFC', 'feedback', 'customer satisfaction', 'QR code', 'API']
    }
  },
  {
    path: '/admin',
    component: 'AdminRedirect',
    requiresAuth: true,
    allowedRoles: ['admin', 'super_admin'],
    meta: {
      title: 'Admin Dashboard - Keephy',
      description: 'Manage your Keephy platform with comprehensive analytics and controls.'
    }
  },
  {
    path: '/feedback/:formId',
    component: 'FeedbackForm',
    requiresAuth: false,
    meta: {
      title: 'Feedback Form - Keephy',
      description: 'Share your feedback with us.'
    }
  },
  {
    path: '/thank-you',
    component: 'ThankYouPage',
    requiresAuth: false,
    meta: {
      title: 'Thank You - Keephy',
      description: 'Thank you for your feedback.'
    }
  }
];

export class RouteChecker {
  private static instance: RouteChecker;
  private errors: string[] = [];

  static getInstance(): RouteChecker {
    if (!RouteChecker.instance) {
      RouteChecker.instance = new RouteChecker();
    }
    return RouteChecker.instance;
  }

  validateRoute(path: string): { isValid: boolean; errors: string[] } {
    this.errors = [];
    
    // Check if route exists
    const route = ROUTES.find(r => r.path === path);
    if (!route) {
      this.errors.push(`Route ${path} not found in route configuration`);
      return { isValid: false, errors: this.errors };
    }

    // Check component exists
    this.checkComponentExists(route.component);
    
    // Check authentication requirements
    this.checkAuthRequirements(route, path);
    
    // Check meta information
    this.checkMetaInformation(route);

    return { isValid: this.errors.length === 0, errors: this.errors };
  }

  private checkComponentExists(componentName: string): void {
    // This would check if the component file exists
    // In a real implementation, you'd use dynamic imports or file system checks
    const validComponents = ['HomePage', 'AdminRedirect', 'FeedbackForm', 'ThankYouPage'];
    if (!validComponents.includes(componentName)) {
      this.errors.push(`Component ${componentName} not found or not properly exported`);
    }
  }

  private checkAuthRequirements(route: RouteConfig, path: string): void {
    if (route.requiresAuth) {
      // Check if auth context is available
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (!token) {
          this.errors.push(`Route ${path} requires authentication but no token found`);
        }
      }
    }
  }

  private checkMetaInformation(route: RouteConfig): void {
    if (!route.meta?.title) {
      this.errors.push(`Route ${route.path} missing required meta title`);
    }
  }

  validateAllRoutes(): { totalRoutes: number; validRoutes: number; errors: string[] } {
    const allErrors: string[] = [];
    let validCount = 0;

    ROUTES.forEach(route => {
      const validation = this.validateRoute(route.path);
      if (!validation.isValid) {
        allErrors.push(...validation.errors);
      } else {
        validCount++;
      }
    });

    return {
      totalRoutes: ROUTES.length,
      validRoutes: validCount,
      errors: allErrors
    };
  }

  checkImageExists(imagePath: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve(false);
        return;
      }

      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => {
        this.errors.push(`Image ${imagePath} failed to load`);
        resolve(false);
      };
      img.src = imagePath;
    });
  }

  checkApiEndpoint(endpoint: string): Promise<{ status: number; error?: string }> {
    return fetch(endpoint, { method: 'HEAD' })
      .then(response => ({ status: response.status }))
      .catch(error => {
        this.errors.push(`API endpoint ${endpoint} is not accessible: ${error.message}`);
        return { status: 0, error: error.message };
      });
  }

  getErrors(): string[] {
    return [...this.errors];
  }

  clearErrors(): void {
    this.errors = [];
  }
}

// Global error handler
export const setupGlobalErrorHandling = () => {
  if (typeof window === 'undefined') return;

  // Unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    RouteChecker.getInstance().errors.push(`Unhandled promise rejection: ${event.reason}`);
  });

  // JavaScript errors
  window.addEventListener('error', (event) => {
    console.error('JavaScript error:', event.error);
    RouteChecker.getInstance().errors.push(`JavaScript error: ${event.error?.message || 'Unknown error'}`);
  });

  // Resource loading errors
  window.addEventListener('error', (event) => {
    if (event.target !== window) {
      console.error('Resource loading error:', event.target);
      RouteChecker.getInstance().errors.push(`Resource loading error: ${(event.target as any)?.src || 'Unknown resource'}`);
    }
  }, true);
};

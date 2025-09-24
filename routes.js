// Centralized Routes Configuration for Web App
export const ROUTES = {
  // Public routes
  HOME: {
    path: '/',
    component: 'HomePage',
    requiresAuth: false,
    meta: {
      title: 'Keephy - NFC Feedback Solutions',
      description: 'Collect real-time customer feedback with NFC, QR codes, and API integration.',
      keywords: ['NFC', 'feedback', 'customer satisfaction', 'QR code', 'API']
    }
  },
  FEEDBACK_FORM: {
    path: '/feedback/:formId',
    component: 'FeedbackForm',
    requiresAuth: false,
    meta: {
      title: 'Feedback Form - Keephy',
      description: 'Share your feedback with us.'
    }
  },
  THANK_YOU: {
    path: '/thank-you',
    component: 'ThankYouPage',
    requiresAuth: false,
    meta: {
      title: 'Thank You - Keephy',
      description: 'Thank you for your feedback.'
    }
  },
  PRIVACY: {
    path: '/privacy',
    component: 'PrivacyPolicy',
    requiresAuth: false,
    meta: {
      title: 'Privacy Policy - Keephy',
      description: 'Our privacy policy and data protection practices.'
    }
  },
  TERMS: {
    path: '/terms',
    component: 'TermsOfService',
    requiresAuth: false,
    meta: {
      title: 'Terms of Service - Keephy',
      description: 'Terms and conditions for using Keephy services.'
    }
  },
  
  // Protected routes
  ADMIN_REDIRECT: {
    path: '/admin',
    component: 'AdminRedirect',
    requiresAuth: true,
    allowedRoles: ['admin', 'super_admin'],
    meta: {
      title: 'Admin Dashboard - Keephy',
      description: 'Manage your Keephy platform with comprehensive analytics and controls.'
    }
  },
  USER_DASHBOARD: {
    path: '/dashboard',
    component: 'UserDashboard',
    requiresAuth: true,
    allowedRoles: ['user', 'admin', 'super_admin'],
    meta: {
      title: 'Dashboard - Keephy',
      description: 'Your personal Keephy dashboard.'
    }
  }
};

// Route validation helper
export const validateRoute = (path, userRole = null) => {
  const route = Object.values(ROUTES).find(r => r.path === path);
  
  if (!route) {
    return { isValid: false, error: `Route ${path} not found` };
  }
  
  if (route.requiresAuth && !userRole) {
    return { isValid: false, error: 'Authentication required' };
  }
  
  if (route.allowedRoles && userRole && !route.allowedRoles.includes(userRole)) {
    return { isValid: false, error: 'Insufficient permissions' };
  }
  
  return { isValid: true, route };
};

// Get all public routes
export const getPublicRoutes = () => {
  return Object.values(ROUTES).filter(route => !route.requiresAuth);
};

// Get all protected routes
export const getProtectedRoutes = () => {
  return Object.values(ROUTES).filter(route => route.requiresAuth);
};

// Get routes by role
export const getRoutesByRole = (role) => {
  return Object.values(ROUTES).filter(route => 
    !route.requiresAuth || !route.allowedRoles || route.allowedRoles.includes(role)
  );
};

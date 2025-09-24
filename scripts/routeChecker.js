#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Import route configuration
const { ROUTES, validateRoute } = require('../routes.js');

class RouteChecker {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  log(message, type = 'info') {
    const prefix = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : '✅';
    console.log(`${prefix} ${message}`);
  }

  checkRouteExists(routePath) {
    const route = Object.values(ROUTES).find(r => r.path === routePath);
    if (!route) {
      this.errors.push(`Route ${routePath} not found in configuration`);
      return false;
    }
    return true;
  }

  checkComponentExists(componentName) {
    const componentPath = path.join(__dirname, '..', 'app', `${componentName}.tsx`);
    const componentPathAlt = path.join(__dirname, '..', 'components', `${componentName}.tsx`);
    
    if (!fs.existsSync(componentPath) && !fs.existsSync(componentPathAlt)) {
      this.errors.push(`Component ${componentName} not found`);
      return false;
    }
    return true;
  }

  checkMetaInformation(route) {
    if (!route.meta) {
      this.warnings.push(`Route ${route.path} missing meta information`);
      return false;
    }

    if (!route.meta.title) {
      this.errors.push(`Route ${route.path} missing required title`);
      return false;
    }

    if (!route.meta.description) {
      this.warnings.push(`Route ${route.path} missing description`);
    }

    return true;
  }

  checkAllRoutes() {
    this.log('Checking all configured routes...', 'info');
    
    Object.values(ROUTES).forEach(route => {
      this.log(`Checking route: ${route.path}`, 'info');
      
      // Check component exists
      this.checkComponentExists(route.component);
      
      // Check meta information
      this.checkMetaInformation(route);
      
      // Check authentication requirements
      if (route.requiresAuth && !route.allowedRoles) {
        this.warnings.push(`Route ${route.path} requires auth but has no role restrictions`);
      }
    });
  }

  checkImageAssets() {
    this.log('Checking image assets...', 'info');
    
    const publicDir = path.join(__dirname, '..', 'public');
    const assetsDir = path.join(__dirname, '..', 'assets');
    
    // Check if directories exist
    if (!fs.existsSync(publicDir)) {
      this.warnings.push('Public directory not found');
    }
    
    if (!fs.existsSync(assetsDir)) {
      this.warnings.push('Assets directory not found');
    }
  }

  checkTranslations() {
    this.log('Checking translation files...', 'info');
    
    const messagesDir = path.join(__dirname, '..', 'messages');
    
    if (!fs.existsSync(messagesDir)) {
      this.errors.push('Messages directory not found');
      return;
    }
    
    const requiredLocales = ['en', 'ar'];
    requiredLocales.forEach(locale => {
      const filePath = path.join(messagesDir, `${locale}.json`);
      if (!fs.existsSync(filePath)) {
        this.errors.push(`Translation file for ${locale} not found`);
      } else {
        try {
          const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          if (Object.keys(content).length === 0) {
            this.warnings.push(`Translation file for ${locale} is empty`);
          }
        } catch (error) {
          this.errors.push(`Invalid JSON in ${locale}.json: ${error.message}`);
        }
      }
    });
  }

  checkAPIConnectivity() {
    this.log('Checking API connectivity...', 'info');
    
    const apiEndpoints = [
      'http://localhost:8080/health',
      'http://localhost:8080/api/auth/me',
      'http://localhost:8080/api/organizations',
      'http://localhost:8080/api/forms'
    ];
    
    // This would require actual HTTP requests in a real implementation
    // For now, we'll just log the endpoints to check
    apiEndpoints.forEach(endpoint => {
      this.log(`API endpoint to check: ${endpoint}`, 'info');
    });
  }

  generateReport() {
    this.log('\n📊 ROUTE VALIDATION REPORT', 'info');
    this.log(`Total Errors: ${this.errors.length}`, this.errors.length > 0 ? 'error' : 'success');
    this.log(`Total Warnings: ${this.warnings.length}`, this.warnings.length > 0 ? 'warning' : 'success');
    
    if (this.errors.length > 0) {
      this.log('\n❌ ERRORS:', 'error');
      this.errors.forEach((error, index) => {
        this.log(`${index + 1}. ${error}`, 'error');
      });
    }
    
    if (this.warnings.length > 0) {
      this.log('\n⚠️ WARNINGS:', 'warning');
      this.warnings.forEach((warning, index) => {
        this.log(`${index + 1}. ${warning}`, 'warning');
      });
    }
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      this.log('\n🎉 All route validations passed!', 'success');
    }
    
    return {
      errors: this.errors,
      warnings: this.warnings,
      success: this.errors.length === 0
    };
  }

  async run() {
    this.log('🚀 Starting Route Validation...', 'info');
    
    this.checkAllRoutes();
    this.checkImageAssets();
    this.checkTranslations();
    this.checkAPIConnectivity();
    
    const report = this.generateReport();
    
    if (!report.success) {
      process.exit(1);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const checker = new RouteChecker();
  checker.run().catch(console.error);
}

module.exports = RouteChecker;

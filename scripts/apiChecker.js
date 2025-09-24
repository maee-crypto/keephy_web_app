#!/usr/bin/env node

const http = require('http');
const https = require('https');

class APIChecker {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.results = [];
  }

  log(message, type = 'info') {
    const prefix = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : '✅';
    console.log(`${prefix} ${message}`);
  }

  async checkEndpoint(url, method = 'GET', expectedStatus = 200) {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const urlObj = new URL(url);
      const isHttps = urlObj.protocol === 'https:';
      const client = isHttps ? https : http;
      
      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port || (isHttps ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method: method,
        timeout: 5000,
        headers: {
          'User-Agent': 'Keephy-API-Checker/1.0',
          'Accept': 'application/json'
        }
      };

      const req = client.request(options, (res) => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        const result = {
          url,
          method,
          status: res.statusCode,
          responseTime,
          success: res.statusCode === expectedStatus,
          headers: res.headers
        };

        this.results.push(result);

        if (res.statusCode === expectedStatus) {
          this.log(`${method} ${url} - ${res.statusCode} (${responseTime}ms)`, 'success');
        } else {
          this.errors.push(`${method} ${url} - Expected ${expectedStatus}, got ${res.statusCode}`);
          this.log(`${method} ${url} - ${res.statusCode} (${responseTime}ms)`, 'error');
        }

        resolve(result);
      });

      req.on('error', (error) => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        this.errors.push(`${method} ${url} - Connection error: ${error.message}`);
        this.log(`${method} ${url} - Connection error (${responseTime}ms)`, 'error');
        
        this.results.push({
          url,
          method,
          status: 0,
          responseTime,
          success: false,
          error: error.message
        });

        resolve({
          url,
          method,
          status: 0,
          responseTime,
          success: false,
          error: error.message
        });
      });

      req.on('timeout', () => {
        this.errors.push(`${method} ${url} - Request timeout`);
        this.log(`${method} ${url} - Timeout`, 'error');
        req.destroy();
        resolve({
          url,
          method,
          status: 0,
          responseTime: 5000,
          success: false,
          error: 'Timeout'
        });
      });

      req.end();
    });
  }

  async checkHealthEndpoints() {
    this.log('Checking health endpoints...', 'info');
    
    const healthEndpoints = [
      'http://localhost:8080/health',
      'http://localhost:4000/api/health',
      'http://localhost:4100/api/health'
    ];

    for (const endpoint of healthEndpoints) {
      await this.checkEndpoint(endpoint, 'GET', 200);
    }
  }

  async checkAuthEndpoints() {
    this.log('Checking authentication endpoints...', 'info');
    
    const authEndpoints = [
      { url: 'http://localhost:8080/api/auth/me', method: 'GET', expectedStatus: 200 },
      { url: 'http://localhost:8080/api/auth/login', method: 'POST', expectedStatus: 400 }, // Should return 400 for missing credentials
      { url: 'http://localhost:8080/api/auth/register', method: 'POST', expectedStatus: 400 } // Should return 400 for missing credentials
    ];

    for (const endpoint of authEndpoints) {
      await this.checkEndpoint(endpoint.url, endpoint.method, endpoint.expectedStatus);
    }
  }

  async checkCoreAPIEndpoints() {
    this.log('Checking core API endpoints...', 'info');
    
    const coreEndpoints = [
      { url: 'http://localhost:8080/api/organizations', method: 'GET', expectedStatus: 401 }, // Should require auth
      { url: 'http://localhost:8080/api/forms', method: 'GET', expectedStatus: 401 }, // Should require auth
      { url: 'http://localhost:8080/api/submissions', method: 'GET', expectedStatus: 401 }, // Should require auth
      { url: 'http://localhost:8080/api/analytics', method: 'GET', expectedStatus: 401 }, // Should require auth
      { url: 'http://localhost:8080/api/notifications', method: 'GET', expectedStatus: 401 } // Should require auth
    ];

    for (const endpoint of coreEndpoints) {
      await this.checkEndpoint(endpoint.url, endpoint.method, endpoint.expectedStatus);
    }
  }

  async checkGatewayEndpoints() {
    this.log('Checking gateway endpoints...', 'info');
    
    const gatewayEndpoints = [
      'http://localhost:8080/health',
      'http://localhost:8080/api/status'
    ];

    for (const endpoint of gatewayEndpoints) {
      await this.checkEndpoint(endpoint, 'GET', 200);
    }
  }

  checkResponseTimes() {
    this.log('Analyzing response times...', 'info');
    
    const slowEndpoints = this.results.filter(result => result.responseTime > 2000);
    const fastEndpoints = this.results.filter(result => result.responseTime < 500);
    
    if (slowEndpoints.length > 0) {
      this.warnings.push(`${slowEndpoints.length} endpoints are slow (>2s)`);
      slowEndpoints.forEach(endpoint => {
        this.log(`Slow endpoint: ${endpoint.url} (${endpoint.responseTime}ms)`, 'warning');
      });
    }
    
    this.log(`Fast endpoints: ${fastEndpoints.length}`, 'success');
    this.log(`Total endpoints checked: ${this.results.length}`, 'info');
  }

  checkErrorRates() {
    this.log('Analyzing error rates...', 'info');
    
    const failedEndpoints = this.results.filter(result => !result.success);
    const errorRate = (failedEndpoints.length / this.results.length) * 100;
    
    if (errorRate > 10) {
      this.warnings.push(`High error rate: ${errorRate.toFixed(2)}%`);
    }
    
    this.log(`Error rate: ${errorRate.toFixed(2)}%`, errorRate > 10 ? 'warning' : 'success');
  }

  generateReport() {
    this.log('\n📊 API VALIDATION REPORT', 'info');
    this.log(`Total Endpoints Checked: ${this.results.length}`, 'info');
    this.log(`Successful Requests: ${this.results.filter(r => r.success).length}`, 'success');
    this.log(`Failed Requests: ${this.results.filter(r => !r.success).length}`, 'error');
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
    
    // Performance summary
    const avgResponseTime = this.results.reduce((sum, r) => sum + r.responseTime, 0) / this.results.length;
    this.log(`Average Response Time: ${avgResponseTime.toFixed(2)}ms`, 'info');
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      this.log('\n🎉 All API validations passed!', 'success');
    }
    
    return {
      results: this.results,
      errors: this.errors,
      warnings: this.warnings,
      success: this.errors.length === 0
    };
  }

  async run() {
    this.log('🚀 Starting API Validation...', 'info');
    
    await this.checkHealthEndpoints();
    await this.checkAuthEndpoints();
    await this.checkCoreAPIEndpoints();
    await this.checkGatewayEndpoints();
    
    this.checkResponseTimes();
    this.checkErrorRates();
    
    const report = this.generateReport();
    
    if (!report.success) {
      process.exit(1);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const checker = new APIChecker();
  checker.run().catch(console.error);
}

module.exports = APIChecker;

#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class ImageChecker {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.checkedImages = new Set();
  }

  log(message, type = 'info') {
    const prefix = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : '✅';
    console.log(`${prefix} ${message}`);
  }

  checkImageExists(imagePath) {
    if (this.checkedImages.has(imagePath)) {
      return true;
    }

    const fullPath = path.resolve(__dirname, '..', imagePath);
    
    if (!fs.existsSync(fullPath)) {
      this.errors.push(`Image not found: ${imagePath}`);
      this.checkedImages.add(imagePath);
      return false;
    }

    // Check if it's actually an image file
    const ext = path.extname(fullPath).toLowerCase();
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'];
    
    if (!imageExtensions.includes(ext)) {
      this.warnings.push(`File may not be an image: ${imagePath}`);
    }

    this.checkedImages.add(imagePath);
    return true;
  }

  findImageReferences() {
    this.log('Scanning for image references...', 'info');
    
    const searchDirs = [
      path.join(__dirname, '..', 'app'),
      path.join(__dirname, '..', 'components'),
      path.join(__dirname, '..', 'public')
    ];

    const imageReferences = [];

    searchDirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        this.warnings.push(`Directory not found: ${dir}`);
        return;
      }

      this.scanDirectory(dir, imageReferences);
    });

    return imageReferences;
  }

  scanDirectory(dir, references) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    files.forEach(file => {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        this.scanDirectory(fullPath, references);
      } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts') || file.name.endsWith('.jsx') || file.name.endsWith('.js')) {
        this.scanFile(fullPath, references);
      }
    });
  }

  scanFile(filePath, references) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Look for image references in various formats
      const patterns = [
        /src=["']([^"']*\.(jpg|jpeg|png|gif|svg|webp))["']/gi,
        /import.*from\s+["']([^"']*\.(jpg|jpeg|png|gif|svg|webp))["']/gi,
        /require\(["']([^"']*\.(jpg|jpeg|png|gif|svg|webp))["']\)/gi,
        /<img[^>]+src=["']([^"']*\.(jpg|jpeg|png|gif|svg|webp))["']/gi
      ];

      patterns.forEach(pattern => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          references.push({
            file: filePath,
            imagePath: match[1],
            line: content.substring(0, match.index).split('\n').length
          });
        }
      });
    } catch (error) {
      this.warnings.push(`Error reading file ${filePath}: ${error.message}`);
    }
  }

  checkPublicImages() {
    this.log('Checking public images...', 'info');
    
    const publicDir = path.join(__dirname, '..', 'public');
    
    if (!fs.existsSync(publicDir)) {
      this.warnings.push('Public directory not found');
      return;
    }

    this.scanDirectory(publicDir, []);
  }

  checkAssetsImages() {
    this.log('Checking assets images...', 'info');
    
    const assetsDir = path.join(__dirname, '..', 'assets');
    
    if (!fs.existsSync(assetsDir)) {
      this.warnings.push('Assets directory not found');
      return;
    }

    this.scanDirectory(assetsDir, []);
  }

  validateImageReferences(references) {
    this.log(`Found ${references.length} image references`, 'info');
    
    references.forEach(ref => {
      this.log(`Checking: ${ref.imagePath} (in ${path.basename(ref.file)}:${ref.line})`, 'info');
      this.checkImageExists(ref.imagePath);
    });
  }

  checkImageOptimization() {
    this.log('Checking image optimization...', 'info');
    
    const publicDir = path.join(__dirname, '..', 'public');
    
    if (!fs.existsSync(publicDir)) {
      return;
    }

    this.checkDirectoryForLargeImages(publicDir);
  }

  checkDirectoryForLargeImages(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    files.forEach(file => {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        this.checkDirectoryForLargeImages(fullPath);
      } else if (file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        const stats = fs.statSync(fullPath);
        const sizeInMB = stats.size / (1024 * 1024);
        
        if (sizeInMB > 1) {
          this.warnings.push(`Large image detected: ${file.name} (${sizeInMB.toFixed(2)}MB)`);
        }
      }
    });
  }

  generateReport() {
    this.log('\n📊 IMAGE VALIDATION REPORT', 'info');
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
      this.log('\n🎉 All image validations passed!', 'success');
    }
    
    return {
      errors: this.errors,
      warnings: this.warnings,
      success: this.errors.length === 0
    };
  }

  async run() {
    this.log('🚀 Starting Image Validation...', 'info');
    
    const references = this.findImageReferences();
    this.validateImageReferences(references);
    this.checkPublicImages();
    this.checkAssetsImages();
    this.checkImageOptimization();
    
    const report = this.generateReport();
    
    if (!report.success) {
      process.exit(1);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const checker = new ImageChecker();
  checker.run().catch(console.error);
}

module.exports = ImageChecker;

#!/bin/bash

# Cleanup script for Playwright Gallery media files
# This script removes all test recordings and screenshots from the media folder

echo "🧹 Playwright Gallery - Media Cleanup Script"
echo "============================================="

MEDIA_DIR="./backend/media"

# Check if media directory exists
if [ ! -d "$MEDIA_DIR" ]; then
    echo "❌ Media directory not found: $MEDIA_DIR"
    echo "   Make sure you're running this script from the project root directory."
    exit 1
fi

# Count files before cleanup
FILE_COUNT=$(find "$MEDIA_DIR" -type f | wc -l | tr -d ' ')
DIR_COUNT=$(find "$MEDIA_DIR" -mindepth 1 -type d | wc -l | tr -d ' ')

if [ "$FILE_COUNT" -eq 0 ] && [ "$DIR_COUNT" -eq 0 ]; then
    echo "✅ Media directory is already clean!"
    exit 0
fi

echo "📁 Found $FILE_COUNT files in $DIR_COUNT directories"
echo ""

# Ask for confirmation
read -p "⚠️  Are you sure you want to delete all media files? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Cleanup cancelled."
    exit 0
fi

echo ""
echo "🗑️  Cleaning up media files..."

# Remove all contents of the media directory but keep the directory itself
if rm -rf "$MEDIA_DIR"/* 2>/dev/null; then
    echo "✅ Successfully cleaned up $FILE_COUNT files and $DIR_COUNT directories"
    echo "📁 Media directory is now empty and ready for new test recordings"
else
    echo "❌ Error occurred during cleanup. Some files might not have been deleted."
    exit 1
fi

echo ""
echo "🎉 Cleanup complete!"

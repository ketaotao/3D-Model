#!/bin/bash
echo "Checking for hardcoded colors in pages..."
echo ""
echo "=== Remaining #1a1a1a ==="
grep -n "#1a1a1a" src/app/pages/*.tsx | head -5
echo ""
echo "=== Remaining #2a2a2a ==="
grep -n "#2a2a2a" src/app/pages/*.tsx | head -5
echo ""
echo "=== Remaining #0a0a0a ==="
grep -n "#0a0a0a" src/app/pages/*.tsx | head -5
echo ""
echo "=== Remaining text-white ==="
grep -n "text-white" src/app/pages/*.tsx | grep -v "text-white rounded-xl" | head -5

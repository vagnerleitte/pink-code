#!/bin/bash
set -e  # fail fast

### 0) Caminhos/nomes
PROJECT_ROOT="$(pwd)"                      # raiz do app Ionic
IOS_DIR="${PROJECT_ROOT}/ios/App"
WORKSPACE_PATH="${IOS_DIR}/App.xcworkspace"
SCHEME_NAME="App"
ARCHIVE_PATH="${PROJECT_ROOT}/build/${SCHEME_NAME}.xcarchive"
IPA_EXPORT_PATH="${PROJECT_ROOT}/build/ipa"
EXPORT_OPTIONS_PLIST="${PROJECT_ROOT}/ExportOptions.plist" # já deve existir

### 1) Build web + sync
echo "📦 Building web assets…"
ionic build
npx cap sync ios        # copia www e plugins

### 2) Limpar build anterior
rm -rf "${PROJECT_ROOT}/build"
mkdir -p "$IPA_EXPORT_PATH"

### 3) Arquivar (Release)
echo "🛠️  Archiving (${SCHEME_NAME})…"
xcodebuild \
  -workspace "$WORKSPACE_PATH" \
  -scheme "$SCHEME_NAME" \
  -configuration Release \
  -sdk iphoneos \
  -archivePath "$ARCHIVE_PATH" \
  archive

### 4) Exportar IPA
echo "📤 Exporting IPA…"
xcodebuild \
  -exportArchive \
  -archivePath "$ARCHIVE_PATH" \
  -exportOptionsPlist "$EXPORT_OPTIONS_PLIST" \
  -exportPath "$IPA_EXPORT_PATH"

echo "✅ IPA gerada em: $IPA_EXPORT_PATH"

[ -d "directory_name" ] && rm -r "dist"
npm run build
serve -s dist

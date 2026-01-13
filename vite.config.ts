import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),        
        keycloakify({
            accountThemeImplementation: "none",
            themeName: "keycloakify-n2n-theme",
            keycloakVersionTargets: {
                "22-to-25": false,
                "all-other-versions": "keycloakify-n2n.jar"
            }             
        })
    ],
    define: {
        // Inject a compatible `process.env.PUBLIC_URL` for libraries that expect Webpack-style env.
        // Use the host environment variable if set, otherwise an empty string (safe fallback).
        'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL ?? ''),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'development')
    }
});

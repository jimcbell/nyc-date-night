import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Log the current directory and available files
console.log('Current directory:', __dirname);
console.log('Available files:', fs.readdirSync(__dirname));

// Serve static files from the wwwroot directory
const staticPath = path.join(__dirname, 'wwwroot');
console.log('Static files path:', staticPath);

if (!fs.existsSync(staticPath)) {
    console.error('Static files directory not found:', staticPath);
    process.exit(1);
}

app.use(express.static(staticPath));

// Handle all routes by serving index.html
app.get('*', (req, res) => {
    const indexPath = path.join(staticPath, 'index.html');
    console.log('Attempting to serve index.html from:', indexPath);
    
    if (!fs.existsSync(indexPath)) {
        console.error('index.html not found at:', indexPath);
        res.status(404).send('Application not properly deployed');
        return;
    }

    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Error serving index.html:', err);
            res.status(500).send('Error loading application');
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Serving static files from: ${staticPath}`);
}); 
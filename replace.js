const fs = require('fs');
const path = require('path');

function replaceCurrency(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceCurrency(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.json')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const newContent = content.replace(/\$(?!\{)/g, '₹');
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
                console.log('Updated', fullPath);
            }
        }
    }
}

replaceCurrency('d:/vendor 3/components');
replaceCurrency('d:/vendor 3/app');

let dbContent = fs.readFileSync('d:/vendor 3/db.json', 'utf8');
let newDbContent = dbContent.replace(/\$(?!\{)/g, '₹');
if (dbContent !== newDbContent) {
    fs.writeFileSync('d:/vendor 3/db.json', newDbContent);
    console.log('Updated db.json');
}

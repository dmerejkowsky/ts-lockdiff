import { LockParser, Package } from '../lockdiff';

export default class NpmParser implements LockParser {
    matches(filename: string): boolean {
        return filename === "package-lock.json";
    }

    parse(contents: string): Package[] {
        const parsed = JSON.parse(contents);
        const entries = Object.entries(parsed.packages);
        const packages = [];
        for (let [name, data] of entries) {
            if (!name) {
                continue;
            }
            name = name.replace(/^node_modules\//, '');
            const packageData = data as { version: string; };
            packages.push({ name, version: packageData.version });
        }
        return packages;
    }
}

import * as lockfile from '@yarnpkg/lockfile';
import { LockParser, Package } from '../lockdiff';

export default class YarnParser implements LockParser {
    matches(filename: string): boolean {
        return filename === "yarn.lock";
    }
    parse(contents: string): Package[] {
        const parsed = lockfile.parse(contents);
        return Object.entries(parsed.object).map(([packageName, packageData]) => {
            const name = packageName.split('@', 2)[0];
            const { version } = packageData;
            return { name, version };
        });
    }
}

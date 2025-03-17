import NpmParser from './parsers/npm'
import YarnParser from './parsers/yarn'

export interface Package {
    name: string
    version: string
}

export interface LockParser {
    matches(filename: string): boolean;
    parse(contents: string): Package[];
}

const parseLock = (contents: string, options: { filename: string }): Package[] => {
    const { filename } = options

    const parsers: LockParser[] = [new NpmParser(), new YarnParser()]

    for (const parser of parsers) {
        if (parser.matches(filename)) {
            return parser.parse(contents)
        }
    }

    throw new Error(`Unknow lock: ${filename}`)
}

export default parseLock
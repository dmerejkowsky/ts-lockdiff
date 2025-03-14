import * as lockfile from '@yarnpkg/lockfile'

export interface Package {
    name: string
    version: string
}

const parseLock = (contents: string, options: { name: string }): Package[] => {
    const byName = new Map([
        ['package-lock.json', parseNpm],
        ['yarn.lock', parseYarn]
    ])

    const { name } = options
    const parseImplementation = byName.get(name)

    if (!parseImplementation) {
        throw new Error(`Unkwown lock name: {name}`)
    }

    return parseImplementation(contents)
}

const parseNpm = (contents: string): Package[] => {
    return []
}

const parseYarn = (contents: string): Package[] => {
    const parsed = lockfile.parse(contents)

    return Object.entries(parsed.object).map(([packageName, packageData]) => {
        const name = packageName.split('@', 2)[0]
        const { version } = packageData
        return { name, version }
    })
}

export default parseLock
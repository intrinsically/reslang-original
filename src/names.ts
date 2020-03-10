import { CodeGenerator } from "@babel/generator"

/**
 * remove version & change to correct case
 * @param name the name to fix
 */
export function fixName(name: string) {
    const match = name.match(/(?<version>v[0-9]+[\-\/])?(?<name>.*)/)
    const real = match ? match.groups!.name : "unknown"

    let fix = ""
    for (const ch of real) {
        if (/^[A-Z]$/.test(ch)) {
            if (fix) {
                fix = fix.concat("-")
            }
            fix = fix.concat(ch.toLowerCase())
        } else if (/^[a-z0-9_\$]$/.test(ch)) {
            fix = fix.concat(ch)
        }
    }
    return fix
}

export function sanitize(name: string) {
    let fix = ""
    for (const ch of name) {
        if (/[A-Za-z0-9]$/.test(ch)) {
            fix = fix.concat(ch)
        } else {
            fix = fix.concat("-")
        }
    }
    return fix
}

export function getVersion(name: string) {
    const match = name.match(/((?<version>v[0-9])[\-\/])?(.*)/)
    return match && match.groups && match.groups.version
        ? match.groups.version
        : "v1"
}

export function capitalizeFirst(name: string) {
    return name.charAt(0).toUpperCase() + name.substring(1)
}

export function lowercaseFirst(name: string) {
    return name.charAt(0).toLowerCase() + name.substring(1)
}

export function pluralizeName(name: string) {
    if (name.endsWith("s")) {
        return name
    }
    if (name.endsWith("y")) {
        return name.substring(0, name.length - 1) + "ies"
    }
    return name + "s"
}

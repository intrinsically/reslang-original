import pluralize from "pluralize"

/**
 * remove version & change to correct snake case
 * @param name the name to fix
 */
export function snakeCase(name: string) {
    let fix = ""
    let dash = false
    for (const ch of removeVersion(name)) {
        if (/^[A-Z]$/.test(ch)) {
            if (fix) {
                if (!dash) {
                    fix = fix.concat("-")
                    dash = true
                }
            }
            fix = fix.concat(ch.toLowerCase())
        } else if (/^[a-z0-9_\-\$]$/.test(ch)) {
            fix = fix.concat(ch)
            dash = false
        } else {
            if (!dash) {
                fix = fix.concat("-")
                dash = true
            }
        }
    }
    return fix
}

export function camelCase(name: string) {
    let fix = ""
    for (const ch of name) {
        if (/[A-Za-z0-9]$/.test(ch)) {
            fix = fix.concat(ch)
        }
    }
    return fix
}

function removeVersion(name: string) {
    const match = name.match(/(?<version>v[0-9]+[\-\/])?(?<name>.*)/)
    return match ? match.groups!.name : "unknown"
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
    return pluralize(name)
}

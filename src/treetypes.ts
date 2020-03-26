/**
 * types for the parse tree
 */

export interface INamespace {
    comment: string
    space?: string
    title: string
    version: string
}

export interface IImport {
    import: string
}

export let PrimitiveType = [
    "int",
    "long",
    "string",
    "boolean",
    "double",
    "date",
    "time",
    "datetime",
    "url"
]

export type DefinitionType =
    | "request-resource"
    | "asset-resource"
    | "resource"
    | "configuration-resource"
    | "subresource"
    | "enum"
    | "action"
    | "structure"
    | "union"
    | "event"

export let ResourceLike = [
    "request-resource",
    "asset-resource",
    "resource",
    "configuration-resource",
    "subresource"
]

export type Kind = "resource-like" | "enum" | "structure" | "union" | "event"
export type AnyKind = IResourceLike | IEnum | IStructure | IUnion | IEvent

// type guards
export function isResourceLike(def: IDefinition): def is IResourceLike {
    return def.kind === "resource-like"
}
export function isEnum(def: IDefinition): def is IEnum {
    return def.kind === "enum"
}
export function isStructure(def: IDefinition): def is IStructure {
    return def.kind === "structure"
}
export function isUnion(def: IDefinition): def is IUnion {
    return def.kind === "union"
}
export function isEvent(def: IDefinition): def is IEvent {
    return def.kind === "event"
}
export function isAction(def: IDefinition): def is IResourceLike {
    return def.type === "action"
}

export interface IReference {
    short: string
    parents: string[]
    module: string // not set for definitions

    // generated from the above info
    name: string
    parentName: string
    parentShort: string
}

export interface IDefinition extends IReference {
    kind: Kind
    type: DefinitionType
    file: string
    comment: string

    // do we need to generate this?
    secondary?: boolean
    generateInput: boolean
}

export interface IResourceLike extends IDefinition {
    kind: "resource-like"
    attributes?: IAttribute[]
    operations?: IOperation[]
    singleton?: boolean
    future?: boolean
    async?: boolean
    bulk?: boolean // only for actions, indicates it's on the entire resource, not a single resource

    // used to see if we generate definitions or not
    generateOutput: boolean
    generatePuttable: boolean
    generatePatchable: boolean
    generateMulti: boolean
}
export interface IEnum extends IDefinition {
    kind: "enum"
    literals?: string[]
}

export interface IStructure extends IDefinition {
    kind: "structure"
    attributes?: IAttribute[]
}

export interface IUnion extends IDefinition {
    kind: "union"
    attributes?: IAttribute[]
}

export interface IEvent extends IDefinition {
    kind: "event"
    // produces or consumes
    produces: boolean
    header?: IAttribute[]
    payload?: IAttribute[]
}

export interface IAttribute {
    name: string
    type: IReference
    inline: boolean
    array: IArray
    stringMap: boolean
    linked: boolean
    comment: string
    modifiers: IModifiers
    constraints: IConstraints
}

export interface IArray {
    type: number
    min: number
    max: number
}

export interface IModifiers {
    mutable: boolean
    output: boolean
    optional: boolean
    optionalPost: boolean
    optionalPut: boolean
    optionalGet: boolean
    query: boolean
    queryonly: boolean
    representation: boolean
}

export interface IConstraints {
    minLength: number
    maxLength: number
}

export interface IDiagram {
    diagram: string
    layout: string
    includeAll: string
    include: IReference[]
    import: IReference[]
    exclude: IReference[]
    fold: { attr: string; of: IReference }[]
    groups: IGroup[]
}

export interface IDocumentation {
    name: string
    entries: IDocEntry[]
}

export interface IDocEntry {
    name: string
    documentation: string
}

export interface IGroup {
    comment: string
    include: IReference[]
}

export interface IOperation {
    operation: string
    comment: string
    errors: IError[]
}

export interface IError {
    codes: { code: string; comment: string }[]
    struct: IReference
}

export function getAllAttributes(el: AnyKind) {
    switch (el.kind) {
        case "resource-like":
            return el.attributes || []
        case "structure":
            return el.attributes || []
        case "union":
            return el.attributes || []
        case "event":
            return (el.payload || []).concat(el.header || [])
        default:
            return []
    }
}

export function getKeyAttributes(el: AnyKind) {
    switch (el.kind) {
        case "resource-like":
            return el.attributes || []
        case "structure":
            return el.attributes || []
        case "union":
            return el.attributes || []
        case "event":
            return el.payload || []
        default:
            return []
    }
}

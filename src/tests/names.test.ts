import {
    pluralizeName,
    fixName,
    getVersion,
    capitalizeFirst,
    lowercaseFirst
} from "../names"

describe("name tests", () => {
    test("name1", () => {
        expect(fixName("One two")).toBe("onetwo")
    })
    test("name2", () => {
        expect(fixName("v2/One Two")).toBe("one-two")
    })

    test("pluralize1", () => {
        expect(pluralizeName("battery")).toBe("batteries")
    })
    test("pluralize2", () => {
        expect(pluralizeName("name")).toBe("names")
    })
    test("pluralize3", () => {
        expect(pluralizeName("sheeps")).toBe("sheeps")
    })

    test("version1", () => {
        expect(getVersion("v2/andrew")).toBe("v2")
    })
    test("version2", () => {
        expect(getVersion("andrew")).toBe("v1")
    })
    test("indexOf1", () => {
        expect("a.b".indexOf(".")).toBe(1)
    })
    test("indexOf2", () => {
        expect("ab".indexOf(".")).toBe(-1)
    })
    test("capitalizeFirst", () => {
        expect(capitalizeFirst("fooBar")).toBe("FooBar")
    })
    test("lowercaseFirst", () => {
        expect(lowercaseFirst("FooBar")).toBe("fooBar")
    })
})

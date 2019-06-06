import { parseFile, readFile, clean } from "../parse"
import { strip } from "./utilities"
import DotvizGen from "../dotvizgen"

/** dotviz generation tests
 */
describe("dotviz generation tests", () => {
    test("simple-resource", () => {
        compare("simple-resource")
    })

    test("complex-resource", () => {
        compare("complex-resource")
    })

    test("singleton", () => {
        compare("singleton")
    })

    test("upversion", () => {
        compare("upversion")
    })

    test("request", () => {
        compare("request")
    })
})

/** compare the output with saved swagger */
function compare(module: string) {
    const tree = parseFile(`models/${module}.reslang`)

    const dotviz = new DotvizGen("models/", module, tree)
    dotviz.processImports()
    const out = dotviz.generate()

    let got = strip(out)
    const expected = strip(
        readFile(`src/tests/dotviz_outputs/${module}.expected`)
    )

    if (got !== expected) {
        console.log(got)
    }
    expect(got).toBe(expected)
}
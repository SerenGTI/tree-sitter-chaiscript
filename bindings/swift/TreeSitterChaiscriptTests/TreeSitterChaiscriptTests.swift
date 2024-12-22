import XCTest
import SwiftTreeSitter
import TreeSitterChaiscript

final class TreeSitterChaiscriptTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_chaiscript())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Chaiscript grammar")
    }
}

// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "TreeSitterChaiscript",
    products: [
        .library(name: "TreeSitterChaiscript", targets: ["TreeSitterChaiscript"]),
    ],
    dependencies: [
        .package(url: "https://github.com/ChimeHQ/SwiftTreeSitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterChaiscript",
            dependencies: [],
            path: ".",
            sources: [
                "src/parser.c",
            ],
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterChaiscriptTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterChaiscript",
            ],
            path: "bindings/swift/TreeSitterChaiscriptTests"
        )
    ],
    cLanguageStandard: .c11
)

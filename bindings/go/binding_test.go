package tree_sitter_chaiscript_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_chaiscript "github.com/SerenGTI/tree-sitter-chaiscript/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_chaiscript.Language())
	if language == nil {
		t.Errorf("Error loading Chaiscript grammar")
	}
}

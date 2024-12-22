from unittest import TestCase

import tree_sitter, tree_sitter_chaiscript


class TestLanguage(TestCase):
    def test_can_load_grammar(self):
        try:
            tree_sitter.Language(tree_sitter_chaiscript.language())
        except Exception:
            self.fail("Error loading Chaiscript grammar")

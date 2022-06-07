(defsystem "moshack-test"
  :defsystem-depends-on ("prove-asdf")
  :author ""
  :license ""
  :depends-on ("moshack"
               "prove")
  :components ((:module "tests"
                :components
                ((:test-file "moshack"))))
  :description "Test system for moshack"
  :perform (test-op (op c) (symbol-call :prove-asdf :run-test-system c)))

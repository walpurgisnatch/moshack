(defsystem "moshack"
  :version "0.1.0"
  :author ""
  :license ""
  :depends-on ("clack"
               "lack"
               "caveman2"
               "envy"
               "cl-ppcre"
               "uiop"
               "cl-syntax-annot"
               "djula"
               "datafly"
               "sxql"
               "mito"
               "local-time"
               "stepster")
  :components ((:module "src"
                :components
                ((:file "models/categories" :depends-on ("models"))
                 (:file "models/organizations" :depends-on ("models"))
                 (:file "models/items" :depends-on ("models"))
                 (:file "main" :depends-on ("config" "view" "db"))
                 (:file "web" :depends-on ("view"))
                 (:file "view" :depends-on ("config"))
                 (:file "db" :depends-on ("config"))
                 (:file "utils")
                 (:file "models" :depends-on ("db" "utils"))
                 (:file "config")))
               (:module "db"
                :components
                ((:file "schema"))))
  :description ""
  :in-order-to ((test-op (test-op "moshack-test"))))

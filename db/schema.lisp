(in-package :cl-user)
(defpackage moshack.schema
  (:use :cl :sxql :cl-annot.class :mito))

(in-package :moshack.schema)

(mito:connect-toplevel :postgres :database-name "moshack" :username "moshack" :password "moshack")

;; (defun ensure-tables ()
;;   (mapcar #'ensure-table-exists '()))

;; (defun migrate-tables ()
;;   (mapcar #'migrate-table '()))


;; (ensure-tables)
;; (migrate-tables)

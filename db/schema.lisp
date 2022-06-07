(in-package :cl-user)
(defpackage moshack.schema
  (:use :cl :sxql :cl-annot.class :mito))

(in-package :moshack.schema)

(mito:connect-toplevel :postgres :database-name "moshack" :username "moshack" :password "moshack")

(defun ensure-tables ()
  (mapcar #'ensure-table-exists '(categories organizations items)))

(defun migrate-tables ()
  (mapcar #'migrate-table '(categories organizations items)))

(deftable categories ()
  ((name               :col-type (:varchar 64))
   (items_count        :col-type :integer)))

(deftable organizations ()
  ((name               :col-type (:varchar 256))
   (description        :col-type (or (:varchar 4096) :null))
   (address            :col-type (or (:varchar 256) :null))
   (inn                :col-type (or (:varchar 16) :null))
   (website            :col-type (or (:varchar 256) :null))))

(deftable items ()
  ((name               :col-type (:varchar 256))
   (category           :references categories)
   (organization       :references organizations)
   (price              :col-type (or :integer :null))))


(ensure-tables)
(migrate-tables)

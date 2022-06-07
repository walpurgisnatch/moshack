(in-package :cl-user)
(defpackage moshack.models
  (:use :cl :sxql :cl-annot.class :datafly)
  (:export :categories-items
           :organizations-items
           :items-organization
           :items-category))

(in-package :moshack.models)

(syntax:use-syntax :annot)

@export-accessors
@export
(defmodel (categories (:inflate created-at #'datetime-to-timestamp)
                      (:inflate updated-at #'datetime-to-timestamp)
                      (:has-many (items items)
                                 (select :*
                                         (from :items)
                                         (where (:= :category id))
                                         (order-by (:desc :created_at)))))
  id
  name
  items-count
  created-at
  updated-at)

@export-accessors
@export
(defmodel (organizations (:inflate created-at #'datetime-to-timestamp)
                         (:inflate updated-at #'datetime-to-timestamp)
                         (:has-many (items items)
                                    (select :*
                                            (from :items)
                                            (where (:= :organization id))
                                            (order-by (:desc :created_at)))))
  id
  name
  description
  address
  inn
  website
  items-count
  created-at
  updated-at)

@export-accessors
@export
(defmodel (items (:inflate created-at #'datetime-to-timestamp)
                 (:inflate updated-at #'datetime-to-timestamp)
                 (:has-a (organization organizations) (where (:= :id organization)))
                 (:has-a (category categories) (where (:= :id category))))

  id
  name
  category
  organization
  price
  created-at
  updated-at)

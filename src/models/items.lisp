(in-package :cl-user)
(defpackage moshack.items
  (:use :cl
        :moshack.models
        :sxql
        :datafly
        :moshack.utils)
  (:import-from :moshack.categories
                :category++)
  (:export  :get-items
            :get-item
            :create-item
            :update-item
            :delete-item))

(in-package :moshack.items)

(defun get-item (id)
  (find-where items (:= :id id)))

(defun get-items (&optional (name "") (limit 100) (offset 0))
  (find-where items (:like :name (wildcard name)) :limit limit :offset offset))

(defun create-item (name category organization &optional (price 0))
  (handler-case 
      (retrieve-one
       (insert-into :items
         (set= :name name
               :category category
               :organization organization
               :price price
               :created_at (local-time:now)
               :updated_at (local-time:now))
         (returning :id)))
    (error (e) e))
  (category++ category))

(defun update-item (id name category organization)
  (execute 
   (update :items
     (set= :name name
           :category category
           :organization organization
           :updated_at (local-time:now))
     (where (:= :id id)))))

(defun items-rows-count ()
  (cadr (retrieve-one
         (select (fields (:count :*))
           (from :categories)))))


(defun delete-item (id)
  (execute 
   (delete-from :items
     (where (:= :id id)))))

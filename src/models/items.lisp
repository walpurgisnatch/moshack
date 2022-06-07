(in-package :cl-user)
(defpackage moshack.items
  (:use :cl
        :moshack.models
        :sxql
        :datafly
        :moshack.utils)
  (:export  :get-items
            :get-item
            :create-item
            :update-item
            :delete-item))

(in-package :moshack.items)


(defun get-item (id)
  (find-where items (:= :id id)))

(defun get-items (&optional (name ""))
  (find-where items (:like :name (wildcard name))))

(defun create-item (name category organization)
  (handler-case 
      (retrieve-one
       (insert-into :items
                    (set= :name name
                          :category category
                          :organization organization
                          :created_at (local-time:now)
                          :updated_at (local-time:now))
                    (returning :id)))
    (error (e) e)))

(defun update-item (name category organization)
  (execute 
   (update :items
           (set= :name name
                 :category category
                 :organization organization
                 :updated_at (local-time:now))
                 (where (:= :id id))))))

(defun delete-item (id)
  (execute 
   (delete-from :items
                (where (:= :id id)))))
